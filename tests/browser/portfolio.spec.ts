import { test as base, expect, type Page } from '@playwright/test';

// Fail the same test on uncaught runtime errors rather than accepting a screenshot
// of a broken client. Every test gets a fresh context and persisted theme.
const test = base.extend<{ runtimeErrors: void }>({
  runtimeErrors: [async ({ page }, use) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await use();
    expect(errors, 'Uncaught browser errors').toEqual([]);
  }, { auto: true }],
});

async function ready(page: Page, hash = '') {
  await page.goto(`/${hash ? `#${hash}` : ''}`);
  await expect(page.locator('#desktop-panel')).toBeVisible();
  // Hydration installs the appearance observer and motion control portal.
  await expect(page.locator('.motion-control')).toHaveCount(1);
  await expect(page.locator(`#desktop-tab-${hash === 'cirrus' ? 'design-library' : hash || 'overview'}`)).toHaveAttribute('aria-selected', 'true');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img:visible').evaluateAll(async images => {
    await Promise.all(images.map(image => (image as HTMLImageElement).decode()));
  });
}

async function fits(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal page overflow').toBe(true);
  const workspace = page.getByRole('region', { name: 'Portfolio workspace', exact: true });
  const bounds = await workspace.boundingBox();
  expect(bounds).not.toBeNull();
  const viewport = page.viewportSize()!;
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.y).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height + 1);
}

async function open(page: Page, slug: string) {
  if (slug === 'cirrus') {
    await open(page, 'design-library');
    await page.getByRole('link', { name: 'Try compact mode →', exact: true }).click();
    await expect(page).toHaveURL(/#cirrus$/);
    await fits(page);
    return;
  }
  if (page.viewportSize()!.width < 768) {
    const dock = page.getByRole('navigation', { name: 'Main navigation', exact: true });
    const labels: Record<string, string> = { overview: 'Home', resume: 'Résumé', contact: 'Contact' };
    if (labels[slug]) await dock.getByRole('button', { name: labels[slug], exact: true }).click();
    else {
      await dock.getByRole('button', { name: 'Work', exact: true }).click();
      const work = page.getByRole('region', { name: 'Work and projects', exact: true });
      const names: Record<string, RegExp> = {
        'design-library': /^Enterprise UX/, 'datadustr-tools': /^Inbox & File Dustr/,
        threadkeep: /^Threadkeep/, timely: /^Timely/,
      };
      await work.getByRole('button', { name: names[slug] }).click();
    }
  } else await page.locator(`#desktop-tab-${slug}`).click();
  await expect(page).toHaveURL(new RegExp(`#${slug}$`));
  await fits(page);
}

for (const theme of ['hacker', 'midnight', 'winter']) {
  test(`@visual home and appearance: ${theme}`, async ({ page }) => {
    await ready(page);
    const mobile = page.viewportSize()!.width < 768;
    if (mobile) await page.getByRole('button', { name: 'Choose appearance', exact: true }).click();
    const themeButton = page.getByRole('button', { name: `Switch to ${theme} theme`, exact: true }).filter({ visible: true });
    // Make keyboard focus explicit instead of depending on Chromium's pointer-focus heuristic.
    await themeButton.press('Enter');
    await expect(themeButton).toBeFocused();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    if (mobile) {
      await expect(page).toHaveScreenshot(`appearance-${theme}.png`);
      await page.getByRole('button', { name: 'Done', exact: true }).press('Enter');
    }
    // Clear pointer hover without changing keyboard focus.
    await page.mouse.move(0, 0);
    await fits(page);
    await expect(page).toHaveScreenshot(`home-${theme}.png`);
  });
}

for (const slug of ['design-library', 'experience', 'about', 'resume', 'contact', 'datadustr-tools', 'cirrus', 'timely', 'threadkeep']) {
  test(`@visual workspace: ${slug}`, async ({ page }) => {
    await ready(page, slug);
    await fits(page);
    await expect(page).toHaveScreenshot(`${slug}.png`);
    const document = page.locator(`[data-desktop-document="${slug}"]`);
    if (await document.count() && await document.evaluate(element => element.scrollHeight > element.clientHeight)) {
      await document.getByRole('link').last().scrollIntoViewIfNeeded();
      await expect(page).toHaveScreenshot(`${slug}-end.png`);
    }
  });
}

test('@visual mobile work list', async ({ page }) => {
  test.skip(page.viewportSize()!.width >= 768, 'Desktop uses the persistent sidebar.');
  await ready(page);
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('button', { name: 'Work', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Work and projects', exact: true })).toBeVisible();
  await fits(page);
  await expect(page).toHaveScreenshot('work-list.png');
  const lastProject = page.getByRole('region', { name: 'Work and projects', exact: true }).getByRole('button', { name: /^Timely/ });
  await expect(lastProject).toBeVisible();
  await lastProject.scrollIntoViewIfNeeded();
  await expect(lastProject).toBeInViewport({ ratio: 1 });
  await expect(page).toHaveScreenshot('work-list-end.png');
});

test('home arrival and navigation never underline the content container', async ({ page }) => {
  await ready(page);
  const panel = page.locator('#desktop-panel');
  await expect(panel).not.toBeFocused();
  await expect(panel).toHaveCSS('text-decoration-line', 'none');
  await open(page, 'contact');
  await open(page, 'overview');
  await expect(panel).toHaveCSS('text-decoration-line', 'none');
  // Explicit keyboard focus reproduces the original CSS bug even on desktop.
  await page.keyboard.press('Tab');
  await panel.focus();
  await expect(panel).toBeFocused();
  await expect(panel).toHaveCSS('text-decoration-line', 'none');
  await expect(panel).toHaveCSS('outline-style', 'solid');
});

test('@visual home with keyboard focus', async ({ page }) => {
  await ready(page);
  await page.keyboard.press('Tab');
  await page.locator('#desktop-panel').focus();
  await expect(page).toHaveScreenshot('home-keyboard-focus.png');
});

test('document headings and final links stay reachable inside the workspace', async ({ page }) => {
  for (const slug of ['design-library', 'experience', 'resume', 'contact']) {
    await ready(page, slug);
    const document = page.locator(`[data-desktop-document="${slug}"]`);
    await expect(document.getByRole('heading', { level: 1 })).toBeInViewport({ ratio: 1 });
    const scrolls = await document.evaluate(element => element.scrollHeight > element.clientHeight);
    if (scrolls) await expect(document).toHaveCSS('overflow-y', /auto|scroll/);
    const lastLink = document.getByRole('link').last();
    await lastLink.scrollIntoViewIfNeeded();
    await expect(lastLink).toBeInViewport({ ratio: 1 });
    await fits(page);
  }
});

test('phone work list can scroll to the final project above the dock', async ({ page }) => {
  test.skip(page.viewportSize()!.width >= 768, 'Desktop uses the persistent sidebar.');
  await ready(page);
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('button', { name: 'Work', exact: true }).click();
  const work = page.getByRole('region', { name: 'Work and projects', exact: true });
  const lastProject = work.getByRole('button', { name: /^Timely/ });
  // A hidden overflow container can be scrolled programmatically but not by users.
  const userCanScroll = await lastProject.evaluate(element => {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      if (parent.scrollHeight > parent.clientHeight && /auto|scroll/.test(getComputedStyle(parent).overflowY)) return true;
    }
    return element.getBoundingClientRect().bottom <= document.querySelector('#desktop-panel')!.getBoundingClientRect().bottom;
  });
  expect(userCanScroll, 'The final project is visible or has a user-scrollable ancestor').toBe(true);
  await lastProject.scrollIntoViewIfNeeded();
  await expect(lastProject).toBeInViewport({ ratio: 1 });
  await lastProject.click();
  await expect(page).toHaveURL(/#timely$/);
});

test('@visual project details', async ({ page }) => {
  await ready(page, 'datadustr-tools');
  await page.getByRole('button', { name: 'Read details', exact: true }).click();
  await expect(page).toHaveURL(/#datadustr-tools\/details$/);
  await expect(page.locator('#desktop-panel article')).toBeVisible();
  await fits(page);
  await expect(page).toHaveScreenshot('project-details.png');
});

test('navigation, details, history and contact work', async ({ page }) => {
  await ready(page);
  for (const slug of ['design-library', 'threadkeep', 'datadustr-tools', 'cirrus', 'timely', 'resume', 'contact']) {
    await open(page, slug);
  }
  await expect(page.locator('#desktop-panel a[href^="mailto:"]').first()).toBeVisible();
  await open(page, 'datadustr-tools');
  await page.getByRole('button', { name: 'Read details', exact: true }).click();
  await expect(page).toHaveURL(/#datadustr-tools\/details$/);
  const article = page.locator('#desktop-panel article');
  await expect(article).toBeVisible();
  await expect(article).toHaveCSS('text-decoration-line', 'none');
  await page.goBack();
  await expect(page).toHaveURL(/#datadustr-tools$/);
  const pdf = await page.request.get('/resume/download');
  expect(pdf.ok()).toBe(true);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('keyboard navigation and appearance focus return', async ({ page }) => {
  await ready(page);
  if (page.viewportSize()!.width < 768) {
    const opener = page.getByRole('button', { name: 'Choose appearance', exact: true });
    await opener.focus();
    await opener.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(opener).toBeFocused();
  } else {
    const overview = page.locator('#desktop-tab-overview');
    await overview.focus();
    await overview.press('ArrowDown');
    await expect(page.locator('#desktop-tab-design-library')).toBeFocused();
    await expect(page.locator('#desktop-tab-design-library')).toHaveAttribute('aria-selected', 'true');
  }
});


test('curated work keeps enterprise, Threadkeep and research clear', async ({ page }) => {
  await ready(page);
  await expect(page.locator('#desktop-tab-framed')).toHaveCount(0);
  await expect(page.locator('#desktop-tab-cirrus')).toHaveCount(0);
  await expect(page.locator('#desktop-tab-as-i-left-it')).toHaveCount(0);
  await open(page, 'threadkeep');
  const preview = page.getByRole('figure', { name: 'Threadkeep application screenshots' });
  await expect(preview.getByRole('img')).toHaveAttribute('src', /return-to-work/);
  await preview.getByRole('button', { name: 'Active session', exact: true }).click();
  await expect(preview.getByRole('img')).toHaveAttribute('src', /active-session/);
  const zoom = page.getByRole('group', { name: 'Preview zoom', exact: true });
  await zoom.getByRole('button', { name: '100%', exact: true }).click();
  const beforeZoom = (await preview.getByRole('img').boundingBox())!.width;
  await zoom.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await expect.poll(async () => (await preview.getByRole('img').boundingBox())!.width).toBeGreaterThan(beforeZoom);
  await zoom.getByRole('button', { name: 'Fit', exact: true }).click();
  await page.getByRole('button', { name: 'Read details', exact: true }).click();
  await expect(page.locator('#desktop-panel article')).toContainText('stale write is rejected');
  await expect(page.locator('#desktop-panel article')).toContainText('fictional projects');
  await open(page, 'cirrus');
  await expect(page.locator('#desktop-tab-design-library')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toHaveAccessibleName('Enterprise UX');
  await page.goto('/projects/framed');
  await expect(page.getByRole('heading', { name: 'Framed', exact: true })).toBeVisible();
  await page.goto('/projects/as-i-left-it');
  await expect(page).toHaveURL(/\/projects\/threadkeep$/);
  await expect(page.getByRole('heading', { name: 'Threadkeep', exact: true })).toBeVisible();
});
