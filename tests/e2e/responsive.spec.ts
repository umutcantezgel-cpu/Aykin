import { test, expect } from '@playwright/test';

// Define the viewports we want to test
const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
  widescreen: { width: 1920, height: 1080 }
};

test.describe('Responsive Visual Regression Tests', () => {
  const pages = [
    { name: 'Home', url: '/' },
    { name: 'Menu', url: '/menu' }
  ];

  for (const pageInfo of pages) {
    test.describe(`Page: ${pageInfo.name}`, () => {
      for (const [viewportName, viewportSize] of Object.entries(viewports)) {
        test(`matches screenshot on ${viewportName}`, async ({ page }) => {
          await page.setViewportSize(viewportSize);
          await page.goto(pageInfo.url);
          
          // Wait for any animations to finish (e.g. blobs, fade-ins)
          await page.waitForLoadState('networkidle');
          // Hide dynamic/flaky elements like timestamp, or animated SVG particles if they break tests
          // await page.evaluate(() => { ... })
          
          // Use full page screenshot for visual comparison
          await expect(page).toHaveScreenshot(`${pageInfo.name.toLowerCase()}-${viewportName}.png`, {
            fullPage: true,
            maxDiffPixelRatio: 0.1, // Allow 10% diff due to subtle animations/fonts
          });
        });
      }
    });
  }
});
