import { expect, test } from '@playwright/test';

test('Sign-up successfully', async ({ page }) => {
	await page.goto('/sign-up', { waitUntil: 'networkidle' });

	await page.getByLabel('Nome do estabelecimento').fill(`Pizza Shop`);
	await page.getByLabel('Seu nome').fill('Eric Erickson');
	await page.getByLabel('Seu e-mail').fill('ketog@kiizo.sm');
	await page.getByLabel('Seu telefone').fill('(458) 337-4281');

	await page.getByRole('button', { name: 'Finalizar cadastro' }).click();

	const toast = page.getByText('Restaurante cadastrado com sucesso.');

	await expect(toast).toBeVisible();
});

test('Sign-in with error', async ({ page }) => {
	await page.goto('/sign-up', { waitUntil: 'networkidle' });

	await page.getByLabel('Nome do estabelecimento').fill(`Wrong Pizza`);
	await page.getByLabel('Seu nome').fill('Eric Erickson');
	await page.getByLabel('Seu e-mail').fill('ketog@kiizo.sm');
	await page.getByLabel('Seu telefone').fill('(458) 337-4281');

	await page.getByRole('button', { name: 'Finalizar cadastro' }).click();

	const toast = page.getByText('Erro ao cadastrar restaurante.');

	await expect(toast).toBeVisible();
});

test('Navigate to login page', async ({ page }) => {
	await page.goto('/sign-up', { waitUntil: 'networkidle' });

	await page.getByRole('link', { name: 'Fazer login' }).click();

	expect(page.url()).toContain('/sign-in');
});
