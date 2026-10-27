import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    toHaveScreenshot: { animations: 'disabled', maxDiffPixelRatio: 0.001 },
  },
  use: {
    baseURL: 'http://127.0.0.1:3017',
    browserName: 'chromium',
    // Use installed Chrome on this older Mac; downloaded Chromium needs newer macOS.
    channel: process.platform === 'darwin' && !process.env.PLAYWRIGHT_EXECUTABLE_PATH ? 'chrome' : undefined,
    reducedMotion: 'reduce',
    locale: 'en-US',
    timezoneId: 'UTC',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : {},
  },
  projects: [
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
    { name: 'tablet', use: { viewport: { width: 820, height: 1180 }, hasTouch: true, deviceScaleFactor: 1 } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
    { name: 'small-mobile', use: { viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
  ],
  webServer: {
    command: 'npm run start -- --hostname 127.0.0.1 --port 3017',
    url: 'http://127.0.0.1:3017',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
