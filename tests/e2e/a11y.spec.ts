import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  const mainPages = [
    { name: 'Home', url: '/' },
    { name: 'Order Hub', url: '/order-hub' },
    { name: 'Menu', url: '/menu' },
    { name: 'Visit', url: '/visit' }
  ];

  for (const pageInfo of mainPages) {
    test(`should not have any automatically detectable accessibility issues on ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.url);
      
      // Wait for main content to load
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
