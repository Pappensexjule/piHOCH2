
import { test, expect, devices } from '@playwright/test';

const iPhone = devices['iPhone 14'];

test.use({ ...iPhone });

test('Homepage ist mobil sauber', async ({ page }) => {
  await page.goto('https://pihoch2.me', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/pihoch2/i);
  const metaViewport = await page.locator('meta[name="viewport"]').count();
  expect(metaViewport).toBeGreaterThan(0);
  const overflowX = await page.evaluate(() => getComputedStyle(document.documentElement).overflowX);
  expect(["visible","clip"]).toContain(overflowX);
});
