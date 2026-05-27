import { test, expect } from '@playwright/test';

test.describe('Customer Happy-Path Flow', () => {
  test('should complete the entire order flow', async ({ page }) => {
    // 1. Home
    await page.goto('/');
    await expect(page).toHaveTitle(/Hey Fede!/);
    
    // Check if hero exists and click to order hub
    const cta = page.getByRole('link', { name: /Menü entdecken|Bestellen/i }).first();
    if (await cta.isVisible()) {
      await cta.click();
    } else {
      await page.goto('/order-hub');
    }

    // 2. Order-Hub: Pickup-Wahl
    await expect(page.url()).toContain('/order-hub');
    const pickupCard = page.getByRole('button', { name: /Abholung/i });
    // Assuming choice cards might be links or buttons
    if (await pickupCard.isVisible()) {
      await pickupCard.click();
    } else {
      // fallback in case of different naming
      await page.goto('/menu');
    }

    // 3. Menu: Add-to-Cart
    await expect(page.url()).toContain('/menu');
    // Find first product card add button
    const firstAddBtn = page.getByRole('button', { name: /Hinzufügen|\+/i }).first();
    await firstAddBtn.click();
    
    // Add a second item just to be sure
    const secondAddBtn = page.getByRole('button', { name: /Hinzufügen|\+/i }).nth(1);
    await secondAddBtn.click();

    // 4. CartDrawer öffnen
    // Wait for Toast to disappear or Cart badge to update
    const cartButton = page.getByRole('button', { name: /Warenkorb/i });
    await cartButton.click();
    
    // Check if Cart Drawer is open
    const cartDrawer = page.locator('[role="dialog"]').filter({ hasText: /Warenkorb/i });
    await expect(cartDrawer).toBeVisible();
    
    // Click checkout
    const checkoutBtn = page.getByRole('button', { name: /Zur Kasse/i });
    await checkoutBtn.click();

    // 5. Checkout-Form ausfüllen
    await expect(page.url()).toContain('/checkout');
    await page.getByLabel(/Name/i).fill('Test Kunde');
    await page.getByLabel(/E-Mail/i).fill('test@hey-fede.de');
    await page.getByLabel(/Telefon/i).fill('015112345678');
    
    const continueBtn = page.getByRole('button', { name: /Weiter/i });
    await continueBtn.click();

    // 6. Pickup-Time-Slot wählen
    await expect(page.url()).toContain('/pickup-time');
    // Select the first available time slot
    const timeSlot = page.getByRole('button', { name: /:/ }).first();
    await timeSlot.click();
    
    const reviewBtn = page.getByRole('button', { name: /Weiter zur Übersicht/i });
    await reviewBtn.click();

    // 7. Order-Review bestätigen
    await expect(page.url()).toContain('/order-review');
    const submitOrderBtn = page.getByRole('button', { name: /Verbindlich bestellen|Kostenpflichtig bestellen/i });
    await submitOrderBtn.click();

    // 8. Order-Status-Page erscheint
    await expect(page.url()).toContain('/order-status');
    const progressBar = page.getByRole('progressbar');
    await expect(progressBar).toBeVisible();
    
    const confirmationText = page.getByText(/Bestellung bestätigt|eingegangen/i);
    await expect(confirmationText).toBeVisible();
  });
});
