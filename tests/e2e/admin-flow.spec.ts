import { test, expect } from '@playwright/test';

test.describe('Admin Flow & Realtime Updates', () => {
  test('should update customer order status in realtime when admin moves order', async ({ browser }) => {
    // We need two separate browser contexts
    const adminContext = await browser.newContext();
    const customerContext = await browser.newContext();

    const adminPage = await adminContext.newPage();
    const customerPage = await customerContext.newPage();

    // 1. Customer creates an order (simplified flow just to get to order status page)
    await customerPage.goto('/menu');
    await customerPage.getByRole('button', { name: /Hinzufügen|\+/i }).first().click();
    await customerPage.getByRole('button', { name: /Warenkorb/i }).click();
    await customerPage.getByRole('button', { name: /Zur Kasse/i }).click();
    
    // Fill Checkout
    await customerPage.getByLabel(/Name/i).fill('Realtime Test Customer');
    await customerPage.getByLabel(/E-Mail/i).fill('realtime@hey-fede.de');
    await customerPage.getByLabel(/Telefon/i).fill('015112345678');
    await customerPage.getByRole('button', { name: /Weiter/i }).click();
    
    // Pickup time
    await customerPage.getByRole('button', { name: /:/ }).first().click();
    await customerPage.getByRole('button', { name: /Weiter zur Übersicht/i }).click();
    
    // Review and Submit
    await customerPage.getByRole('button', { name: /Verbindlich bestellen|Kostenpflichtig/i }).click();
    
    // Wait for customer to land on order status page
    await expect(customerPage).toHaveURL(/\/order-status/);
    const orderUrl = customerPage.url();
    const orderId = orderUrl.split('/').pop();
    expect(orderId).toBeDefined();

    // 2. Admin logs in
    await adminPage.goto('/auth');
    // Using credentials from .env.test or mock ones if emulator
    const adminEmail = process.env.ADMIN_TEST_EMAIL || 'admin@hey-fede.de';
    const adminPassword = process.env.ADMIN_TEST_PASSWORD || 'admin123';
    
    await adminPage.getByLabel(/E-Mail/i).fill(adminEmail);
    await adminPage.getByLabel(/Passwort/i).fill(adminPassword);
    await adminPage.getByRole('button', { name: /Anmelden|Login/i }).click();

    // Navigate to Admin Orders Kanban
    await adminPage.goto('/admin/orders');
    
    // 3. Admin finds the order in Pending and drags it to Preparing
    // Find the card for this specific order
    const orderCard = adminPage.locator(`[data-order-id="${orderId}"]`);
    await expect(orderCard).toBeVisible();

    const pendingColumn = adminPage.locator('[data-status="pending"]');
    const preparingColumn = adminPage.locator('[data-status="preparing"]');
    const readyColumn = adminPage.locator('[data-status="ready"]');

    // Drag to preparing
    await orderCard.dragTo(preparingColumn);
    
    // 4. Verify Realtime update on Customer Page (Preparing)
    const progressBar = customerPage.getByRole('progressbar');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '50', { timeout: 10000 }); // Assuming 50 is preparing
    await expect(customerPage.getByText(/In Zubereitung/i)).toBeVisible();

    // 5. Admin drags order to Ready
    await orderCard.dragTo(readyColumn);

    // 6. Verify Realtime update on Customer Page (Ready + Confetti)
    await expect(progressBar).toHaveAttribute('aria-valuenow', '100', { timeout: 10000 }); // Assuming 100 is ready
    await expect(customerPage.getByText(/Abholbereit/i)).toBeVisible();
    
    // Check for Confetti burst (canvas or specific class)
    const confetti = customerPage.locator('canvas, [class*="confetti"]');
    await expect(confetti).toBeAttached();

    // Cleanup contexts
    await adminContext.close();
    await customerContext.close();
  });
});
