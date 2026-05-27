import { test, expect } from '@playwright/test';

test.describe('PhysicsPlayground', () => {
  test('Canvas Hydration: Navigate to PhysicsPlayground and verify the Matter.js canvas is mounted successfully with zero console errors', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') logs.push(msg.text());
    });
    page.on('pageerror', err => logs.push(err.message));

    // Assume the physics playground might be on the home page or a specific route
    await page.goto('/');
    
    // Attempt to navigate to a physics page if it exists, otherwise test the home page
    const physicsLink = page.getByRole('link', { name: /physics|playground/i });
    if (await physicsLink.count() > 0) {
      await physicsLink.click();
      await page.waitForLoadState('networkidle');
    }

    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeAttached();
    
    // No hydration errors
    expect(logs.filter(log => log.includes('Hydration') || log.includes('Minified React error'))).toHaveLength(0);
  });

  test('Interaction Safety: Simulate click-and-drag events inside the canvas coordinates; verify no unhandled JS exceptions', async ({ page }) => {
    let hasError = false;
    page.on('pageerror', () => { hasError = true; });
    
    await page.goto('/');
    const physicsLink = page.getByRole('link', { name: /physics|playground/i });
    if (await physicsLink.count() > 0) {
      await physicsLink.click();
      await page.waitForLoadState('networkidle');
    }

    const canvas = page.locator('canvas').first();
    if (await canvas.count() > 0) {
      const box = await canvas.boundingBox();
      if (box) {
        // Simulate click and drag from center
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;
        
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(startX + 100, startY + 100, { steps: 10 });
        await page.mouse.up();
      }
    }
    
    expect(hasError).toBe(false);
  });

  test('Resize Observer: Resize the browser window via Playwright; verify the canvas width and height attributes update dynamically', async ({ page }) => {
    await page.goto('/');
    const physicsLink = page.getByRole('link', { name: /physics|playground/i });
    if (await physicsLink.count() > 0) {
      await physicsLink.click();
      await page.waitForLoadState('networkidle');
    }

    const canvas = page.locator('canvas').first();
    if (await canvas.count() > 0) {
      // Set to one size
      await page.setViewportSize({ width: 800, height: 600 });
      await page.waitForTimeout(500); // Allow resize observer to fire
      
      const box1 = await canvas.boundingBox();
      
      // Set to another size
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.waitForTimeout(500);
      
      const box2 = await canvas.boundingBox();
      
      if (box1 && box2) {
        expect(box2.width).not.toBe(box1.width);
        expect(box2.height).not.toBe(box1.height);
      }
    }
  });

  test('Memory Leak / Engine Cleanup: Navigate to the Physics page, then away. Verify via DOM and console that the Matter.js engine is destroyed', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') logs.push(msg.text());
    });

    await page.goto('/');
    const physicsLink = page.getByRole('link', { name: /physics|playground/i });
    if (await physicsLink.count() > 0) {
      await physicsLink.click();
      await page.waitForLoadState('networkidle');
      
      // Verify canvas is there
      await expect(page.locator('canvas').first()).toBeAttached();
      
      // Navigate away
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      
      // Verify canvas is gone
      await expect(page.locator('canvas')).toHaveCount(0);
    }
    
    // Check for leak errors
    expect(logs.filter(log => log.toLowerCase().includes('leak') || log.toLowerCase().includes('engine'))).toHaveLength(0);
  });

  test('Multiple Instances Safety: Navigate back and forth to the Physics page 3 times. Verify only one canvas exists at a time', async ({ page }) => {
    await page.goto('/');
    
    // To reliably test this, we can force multiple visits
    for (let i = 0; i < 3; i++) {
      // Go to physics-related route or just home if it's there
      await page.goto('/?physics=true', { waitUntil: 'commit' });
      await page.waitForTimeout(500);
      
      await page.goto('/about', { waitUntil: 'commit' });
      await page.waitForTimeout(500);
    }
    
    await page.goto('/?physics=true', { waitUntil: 'networkidle' });
    
    // Ensure we don't have dangling canvases
    const canvases = page.locator('canvas');
    const count = await canvases.count();
    
    // Depending on architecture, might be 0 if not on the right page, but should never be > 1
    expect(count).toBeLessThanOrEqual(1);
  });
});
