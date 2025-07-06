import { test, expect } from '@playwright/test';
import { testConfig } from '../config/testConfig';

test.describe('Cart Functionality', { tag: ['@cart', '@e2e'] }, () => {

    test('add product to cart', { tag: ['@smoke', '@cart', '@positive', '@p1'] }, async ({ page }) => {
        await page.goto(testConfig.routes.home);

        // open desktop menu
        await page.locator('span.title', { hasText: 'Mega Menu' }).hover();
        await page.locator('a[title="Desktop"]').click();

        // select product
        await page.locator('div.carousel-item.active > img[title="Palm Treo Pro"]').click();
        await expect(page.locator('h1')).toContainText('Palm Treo Pro');

        // add to cart
        await page.locator('#container button[title="Add to Cart"]').click();

        // verify via success message
        await expect(page.locator('.alert-success')).toContainText('Success');

        // go view cart
        await page.locator('a.btn-primary', { hasText: 'View Cart' }).click();

        // assert cart item and quantity
        await expect(page.locator('td.text-left', { hasText: 'Palm Treo Pro' })).toBeVisible();
        await expect(page.locator('div.flex-nowrap > input')).toHaveValue('1');

    });

    test('view empty cart', { tag: ['@smoke', '@cart', '@validation', '@p2'] }, async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');

        // Validate empty cart message
        await expect(page.getByText('Your shopping cart is empty!')).toBeVisible();
    });

    test('update product quantity in cart', { tag: ['@regression', '@cart'] }, async ({ page }) => {
        await page.goto(testConfig.routes.home);

        await page.fill('input[name="search"]', 'iphone');
        await page.click('button[type="submit"]');

        // Add product to cart
        const firstProduct = page.locator('.product-thumb').first();
        await firstProduct.getByRole('button', { name: /Add to Cart/i }).click();

        // Go to cart page
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');

        // Update quantity
        await page.fill('input[name*="quantity"]', '2');
        await page.click('button[title="Update"]');

        // Validate success message
        await expect(page.locator('.alert-success')).toContainText('Success');
    });

    test('remove product from cart', { tag: ['@regression', '@cart'] }, async ({ page }) => {
        await page.goto(testConfig.routes.home);

        await page.fill('input[name="search"]', 'iphone');
        await page.click('button[type="submit"]');

        // Add product to cart
        const firstProduct = page.locator('.product-thumb').first();
        await firstProduct.getByRole('button', { name: /Add to Cart/i }).click();

        // Go to cart page
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');

        // Remove product
        await page.click('button[title="Remove"]');

        // Verify cart is empty
        await expect(page.getByText('Your shopping cart is empty!')).toBeVisible();
    });

});
