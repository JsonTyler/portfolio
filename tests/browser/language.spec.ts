import { test, expect } from '@playwright/test';

async function spanish(page: import('@playwright/test').Page) {
  await expect(page.locator('.motion-control')).toHaveCount(1);
  await page.getByRole('button', { name: 'Cambiar a español', exact: true }).filter({ visible: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
}

test('Spanish translates navigation and pages and persists across reloads', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await spanish(page);
  if (page.viewportSize()!.width < 768) await expect(page.getByRole('navigation', { name: 'Navegación principal', exact: true })).toBeVisible();
  else await expect(page.locator('#desktop-tab-overview')).toContainText('Resumen');
  await page.goto('/#design-library/details');
  const article = page.locator('#desktop-panel article');
  await expect(article.getByRole('heading', { name: 'Coherencia mediante componentes compartidos.' })).toBeVisible();
  await expect(article).toContainText('Mi contribución');
  await expect(article).not.toContainText('My contribution');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'hacker');
  await article.getByRole('link', { name: 'Leer el caso del modo compacto', exact: false }).click();
  await expect(page).toHaveURL(/#cirrus\/details$/);
  await expect(page.locator('#desktop-panel article')).toContainText('Resultado entregado');
  await page.getByRole('button', { name: 'Switch to English', exact: true }).filter({ visible: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveURL(/#cirrus\/details$/);
  await expect(page.locator('#desktop-panel article')).toContainText('Shipped result');
  expect(errors).toEqual([]);
});

test('language changes preserve interactive state and identify the English PDF', async ({ page }) => {
  await page.goto('/#cirrus');
  const compact = page.getByRole('button', { name: 'Use compact density', exact: true });
  await compact.click();
  await spanish(page);
  await expect(page).toHaveURL(/#cirrus$/);
  await expect(page.getByRole('button', { name: 'Usar densidad amplia', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/#datadustr-tools');
  await page.getByRole('button', { name: /Eliminación masiva protegida/ }).click();
  await expect(page.getByRole('status').filter({ hasText: 'mensajes de ejemplo enviados a la papelera' })).toBeVisible();
  await page.getByRole('button', { name: 'Deshacer', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Limpieza deshecha' })).toBeVisible();
  await page.goto('/#resume');
  await expect(page.getByRole('link', { name: 'Descargar CV · PDF en inglés' })).toBeVisible();
  await page.goto('/about');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('heading', { name: 'Un ingeniero con mirada de diseñador.' })).toBeVisible();
});


test('@visual Spanish home and design system', async ({ page }) => {
  await page.goto('/');
  await spanish(page);
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('spanish-home.png');
  await page.goto('/#design-library/details');
  await expect(page.locator('#desktop-panel article')).toBeVisible();
  await expect(page.locator('#desktop-panel article')).toContainText('Mi contribución');
  await expect(page).toHaveScreenshot('spanish-design-system.png');
});
