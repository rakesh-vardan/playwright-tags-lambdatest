import { test, expect } from '@playwright/test';
import { testConfig } from '../config/testConfig';

test.describe('Homepage Smoke Tests', { tag: ['@e2e', '@smoke'] }, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(testConfig.routes.home);
    });

    test('should have correct title and URL @smoke @homepage @ui @p1', async ({ page }) => {
        await expect(page).toHaveTitle(/Your Store/);
        await expect(page).toHaveURL(testConfig.routes.home);
    });
});

test.describe('Homepage UI Sections', { tag: ['@ui', '@e2e'] }, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(testConfig.routes.home);
    });

    test('should display main banner carousel and featured products @ui @homepage @smoke @p1', async ({ page }) => {
        const heroCarousel = page.locator('.swiper').first();
        await expect(heroCarousel.locator('.swiper-slide-active')).toBeVisible();

        // Check carousel slides appear
        const slidesCount = await page.locator('.swiper-slide').count();
        expect(slidesCount).toBeGreaterThan(0);

        // Check featured product thumbs
        const count = await page.locator('.product-thumb').count();
        expect(count).toBeGreaterThan(0);
    });

    test('should display search box and trending categories @ui @homepage @regression @p2', async ({ page }) => {
        await expect(page.getByPlaceholder('Search For Products').first()).toBeVisible();
        await expect(page.getByRole('heading', { name: /Top Trending Categories/i })).toBeVisible();
    });

    test('should display wishlist, compare, and footer copyright @ui @homepage @regression @p2', async ({ page }) => {
        const header = page.locator('header');
        await expect(header.getByRole('link', { name: 'Wishlist', exact: true })).toBeVisible();
        await expect(header.getByRole('link', { name: 'Compare', exact: true })).toBeVisible();

        await expect(page.locator('footer')).toContainText('© LambdaTest');
    });

    test('should display Top Products and Latest Range sections @ui @homepage @regression @p2', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /Top Products/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /Latest Range/i })).toBeVisible();
    });
});

test.describe('Homepage Navigation', { tag: ['@navigation', '@e2e'] }, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(testConfig.routes.home);
    });

    test('should navigate to Specials page @homepage @navigation @smoke @p1', async ({ page }) => {
        await page.getByRole('link', { name: 'Special Hot', exact: true }).click();
        await expect(page.getByRole('heading', { name: /Special Offers/i })).toBeVisible();
    });

});
