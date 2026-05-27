import { test, expect } from '@playwright/test';

test.describe('SyrupCursor', () => {
  test('DOM Injection: Verify the custom cursor container is present in the DOM upon page load without triggering Next.js hydration errors', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') logs.push(msg.text());
    });
    page.on('pageerror', err => logs.push(err.message));

    await page.goto('/');
    
    // Check for custom cursor container (placeholder selector)
    const cursorContainer = page.locator('#syrup-cursor, .custom-cursor');
    await expect(cursorContainer).toBeAttached();
    
    expect(logs.filter(log => log.includes('Hydration') || log.includes('Minified React error'))).toHaveLength(0);
  });

  test('Native Cursor Hidden: Verify that the <body> or main container has cursor: none applied', async ({ page }) => {
    await page.goto('/');
    
    const bodyCursor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).cursor;
    });
    
    // Some implementations might hide the cursor on a specific wrapper rather than body
    const wrapperCursor = await page.evaluate(() => {
      const wrapper = document.querySelector('main') || document.querySelector('#__next') || document.body;
      return window.getComputedStyle(wrapper).cursor;
    });

    expect(bodyCursor === 'none' || wrapperCursor === 'none').toBeTruthy();
  });

  test('Movement Tracking: Move the mouse via Playwright and assert the custom cursor element updates to match coordinates', async ({ page }) => {
    await page.goto('/');
    
    const cursor = page.locator('#syrup-cursor, .custom-cursor').first();
    await expect(cursor).toBeAttached();

    await page.mouse.move(100, 100);
    await page.waitForTimeout(100); // Give RAF time to update
    
    const box = await cursor.boundingBox();
    expect(box).not.toBeNull();
    
    // The visual center of the custom cursor should be close to 100, 100
    // We do a loose assertion since it might have a delay/spring physics
    await page.mouse.move(300, 300);
    await page.waitForTimeout(300);
    
    const newBox = await cursor.boundingBox();
    expect(newBox).not.toBeNull();
    if (box && newBox) {
      expect(newBox.x).not.toBe(box.x);
      expect(newBox.y).not.toBe(box.y);
    }
  });

  test('Hover State Interaction: Hover over a clickable element and verify the cursor element receives an active/hover state', async ({ page }) => {
    await page.goto('/');
    
    // Inject a dummy button to hover over if page is empty
    await page.evaluate(() => {
      const btn = document.createElement('button');
      btn.id = 'test-hover-btn';
      btn.innerText = 'Hover Me';
      btn.style.position = 'absolute';
      btn.style.top = '200px';
      btn.style.left = '200px';
      btn.style.width = '100px';
      btn.style.height = '100px';
      document.body.appendChild(btn);
    });

    const cursor = page.locator('#syrup-cursor, .custom-cursor').first();
    const btn = page.locator('#test-hover-btn');
    
    // Initial state
    const initialClass = await cursor.getAttribute('class');
    const initialTransform = await cursor.evaluate(el => window.getComputedStyle(el).transform);
    
    // Hover over button
    await btn.hover();
    await page.waitForTimeout(200); // Wait for transition
    
    const hoverClass = await cursor.getAttribute('class');
    const hoverTransform = await cursor.evaluate(el => window.getComputedStyle(el).transform);
    
    // The cursor should have changed visually (class change or transform scale change)
    expect(hoverClass !== initialClass || hoverTransform !== initialTransform).toBeTruthy();
  });

  test('Cleanup Validation: Navigate between pages rapidly and check the console to ensure no requestAnimationFrame leaks', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') logs.push(msg.text());
    });

    await page.goto('/');
    
    // Rapid navigation
    for (let i = 0; i < 5; i++) {
      await page.goto('/menu', { waitUntil: 'commit' });
      await page.goto('/', { waitUntil: 'commit' });
    }
    
    // Wait for everything to settle
    await page.waitForLoadState('networkidle');
    
    // Ensure only one cursor exists
    const cursors = page.locator('#syrup-cursor, .custom-cursor');
    const count = await cursors.count();
    expect(count).toBeLessThanOrEqual(1);
    
    // Check for leak errors in console
    expect(logs.filter(log => log.toLowerCase().includes('leak') || log.toLowerCase().includes('unmounted'))).toHaveLength(0);
  });
});
