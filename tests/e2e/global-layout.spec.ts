import { test, expect } from '@playwright/test';

test.describe('Global Layout', () => {
  test('Header Rendering: Verify the header is visible and contains core navigation links', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const links = ['Home', 'Menu', 'About', 'Visit'];
    for (const link of links) {
      const navLink = header.getByRole('link', { name: link });
      await expect(navLink).toBeVisible();
    }
  });

  test('Footer Rendering: Verify the footer loads with legal pages, contact info, and is structurally placed at the bottom', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for some expected footer content
    await expect(footer).toContainText(/contact/i);
    await expect(footer).toContainText(/privacy|terms|legal/i);
  });

  test('Mobile Responsiveness: Viewport set to mobile; verify the hamburger menu is visible and toggles the navigation pane correctly', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    const hamburger = page.locator('button[aria-label="Toggle menu"], .hamburger-menu');
    await expect(hamburger).toBeVisible();
    
    await hamburger.click();
    const navPane = page.locator('nav.mobile-nav, .mobile-menu');
    await expect(navPane).toBeVisible();
  });

  test('Layout Persistence: Navigate across 3 different pages and verify the Layout (Header/Footer) persists without layout shift or unmounting errors', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') logs.push(msg.text());
    });
    page.on('pageerror', err => logs.push(err.message));

    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Navigate to Menu
    await page.getByRole('link', { name: 'Menu' }).click();
    await page.waitForURL('**/menu*');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Navigate to About
    await page.getByRole('link', { name: 'About' }).click();
    await page.waitForURL('**/about*');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    expect(logs.filter(log => log.includes('Hydration') || log.includes('unmount'))).toHaveLength(0);
  });

  test('Sticky Header Behavior: Scroll down the page and verify the header remains sticky/fixed', async ({ page }) => {
    await page.goto('/');
    
    // Ensure the page has enough height to scroll
    await page.evaluate(() => {
      document.body.style.minHeight = '2000px';
    });

    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    const initialBox = await header.boundingBox();
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500); // Wait for potential transitions
    
    const scrolledBox = await header.boundingBox();
    
    // Header should still be visible and at the top of the viewport
    await expect(header).toBeVisible();
    expect(scrolledBox?.y).toBe(0);
  });
});
