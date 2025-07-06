import { test, expect } from '@playwright/test';

test.describe('Account Page Tests', { tag: ['@account', '@e2e'] }, () => {

    test('attempt login with invalid credentials', { tag: ['@regression', '@account', '@negative', '@p1'] }, async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

        await page.fill('#input-email', 'test@example.com');
        await page.fill('#input-password', 'wrongpassword');

        await page.click('input[value="Login"]');

        await expect(page.locator('.alert-danger')).toBeVisible();
        await expect(page.locator('.alert-danger')).toContainText('Warning: No match for E-Mail Address and/or Password.');
    });

    test('verify registration form fields', { tag: ['@smoke', '@account', '@ui', '@validation', '@p1'] }, async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');

        await expect(page.locator('#input-firstname')).toBeVisible();
        await expect(page.locator('#input-lastname')).toBeVisible();
        await expect(page.locator('#input-email')).toBeVisible();
        await expect(page.locator('#input-telephone')).toBeVisible();
        await expect(page.locator('#input-password')).toBeVisible();
        await expect(page.locator('#input-confirm')).toBeVisible();
        await expect(page.getByRole('checkbox', { name: /Privacy Policy/i })).toBeVisible();
    });

    test('attempt registration with existing email', { tag: ['@regression', '@account', '@negative', '@validation', '@p2'] }, async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');

        await page.fill('#input-firstname', 'Test');
        await page.fill('#input-lastname', 'User');
        await page.fill('#input-email', 'test@example.com'); // Assume this is an existing account
        await page.fill('#input-telephone', '1234567890');
        await page.fill('#input-password', 'password123');
        await page.fill('#input-confirm', 'password123');

        await page.click('input[name="agree"]'); // Agree to privacy policy
        await page.click('input[value="Continue"]'); // Submit registration form

        await expect(page.locator('.alert-danger')).toBeVisible();
        await expect(page.locator('.alert-danger')).toContainText('Warning: E-Mail Address is already registered!');
    });

    test('verify forgot password functionality', { tag: ['@regression', '@account', '@positive', '@p2'] }, async ({ page }) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/forgotten');

        await page.fill('#input-email', 'test@example.com');
        await page.click('input[value="Continue"]'); // Submit the forgot password form

        await expect(page.locator('.alert-success')).toBeVisible();
        await expect(page.locator('.alert-success')).toContainText('An email with a confirmation link has been sent your email address.');
    });

});
