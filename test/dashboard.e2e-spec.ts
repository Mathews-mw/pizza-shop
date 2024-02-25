import { expect, test } from '@playwright/test';

test('Display day orders amount metric', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' });

	await expect(page.getByText('20', { exact: true })).toBeVisible();
	await expect(page.getByText('-5% em relação ao dia anterior')).toBeVisible();
});

test('Display month orders amount metric', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' });

	await expect(page.getByText('200', { exact: true })).toBeVisible();
	await expect(page.getByText('+7% em relação ao mês anterior')).toBeVisible();
});

test('Display month canceled orders amount metric', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' });

	await expect(page.getByText('5', { exact: true })).toBeVisible();
	await expect(page.getByText('-5% em relação ao mês anterior')).toBeVisible();
});

test('Display month revenue metric', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' });

	await expect(page.getByText('R$ 200,00')).toBeVisible();
	await expect(page.getByText('-5% em relação ao mês anterior')).toBeVisible();
});
