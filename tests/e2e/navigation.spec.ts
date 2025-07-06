import { test, expect } from '@playwright/test';
import { testConfig } from '../config/testConfig';

// This file contains tests tagged using both old and new tagging strategies.

test.describe('Category Navigation', { tag: ['@navigation', '@e2e'] }, () => {

    test('navigate to category page', { tag: ['@smoke', '@navigation', '@positive', '@p1'] }, async ({ page }) => {
        await page.goto(testConfig.routes.home);

        // Open the mega menu by clicking "Shop by Category"
        await page.click('a:has-text("Shop by Category")');

        // Wait for the Components link to be visible
        await page.waitForSelector('a:has-text("Components")', { state: 'visible' });

        // Now click on Components
        await page.click('a:has-text("Components")');

        // Validate
        await expect(page).toHaveURL(/route=product\/category&path=25/);
        await expect(page.locator('h1')).toContainText('Components');
    });

    test('verify category page elements', { tag: ['@regression', '@navigation'] }, async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25');

        // Breadcrumb should be visible
        await expect(page.locator('.breadcrumb')).toBeVisible();

        // Products should be listed
        await expect(page.locator('.product-thumb').first()).toBeVisible();
    });


    test('verify category view options', { tag: ['@regression', '@navigation'] }, async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/search&search=macbook');

        // Check for Grid and List view buttons
        await expect(page.locator('button#grid-view')).toBeVisible();
        await expect(page.locator('button#list-view')).toBeVisible();
    });

    test('verify category view options - another page', { tag: ['@smoke', '@navigation'] }, async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25');

        // Grid/List view buttons
        await expect(page.locator('button#grid-view')).toBeVisible();
        await expect(page.locator('button#list-view')).toBeVisible();
    });

});
