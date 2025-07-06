import { test, expect } from '@playwright/test';
import { testConfig } from '../config/testConfig';

test.describe('Search Functionality', { tag: ['@search', '@e2e'] }, () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(testConfig.routes.home);
    });

    test('should search for a valid product', { tag: ['@smoke', '@search', '@positive', '@p1', '@critical'] }, async ({ page }) => {
        await page.fill('input[name="search"]', 'iphone');
        await page.click('button[type="submit"]');

        // Verify that there is at least 1 visible product-thumb
        const products = page.locator('.product-thumb');
        await expect(products.first()).toBeVisible(); // check the first product is visible

        // Verify that all the search product results contains "iPhone"
        const count = await products.count();
        for (let i = 0; i < count; i++) {
            await expect(products.nth(i)).toContainText(/iPhone/i);
        }
    });

    test('should display all products on empty search', { tag: ['@regression', '@search'] }, async ({ page }) => {
        await page.click('button[type="submit"]');

        // Verify that product thumbnails are present
        const products = page.locator('.product-thumb');
        await expect(products.first()).toBeVisible();

        // Optional: Verify that there are multiple products
        const count = await products.count();
        expect(count).toBeGreaterThan(0);
    });



    test('should show no results message for a non-existing product', { tag: ['@regression', '@search'] }, async ({ page }) => {
        await page.fill('input[name="search"]', 'nonexistentproduct123456');
        await page.click('button[type="submit"]');

        await expect(page.getByText('There is no product that matches the search criteria.')).toBeVisible();
    });

    test('should display product price and description for search results', { tag: ['@regression', '@search'] }, async ({ page }) => {
        await page.fill('input[name="search"]', 'macbook');
        await page.click('button[type="submit"]');

        const products = page.locator('.product-thumb');
        await expect(products.first()).toBeVisible();

        const firstProduct = products.first();
        await expect(firstProduct.locator('.price')).toBeVisible();

        // Check that description text exists, even if collapsed
        await expect(firstProduct.locator('p.description')).toHaveText(/Intel|MacBook/i);
    });

});
