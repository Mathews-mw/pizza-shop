import { expect, test } from '@playwright/test';

test('Sign-in successfully', async ({ page }) => {
	await page.goto('/sign-in', { waitUntil: 'networkidle' }); // A opção 'networkidle' informa para que a requisição espere todos os scripts serem carregados da página

	await page.getByLabel('Seu e-mail').fill('johndoe@example.com');
	await page.getByRole('button', { name: 'Acessar painel' }).click();

	const toast = page.getByText('Enviamos um token de autenticação para o seu e-mail.');

	// await page.waitForTimeout(2000); // O teste irá aguardar 2s para ser encerrado

	await expect(toast).toBeVisible();
});

test('Sign-in with wrong credentials', async ({ page }) => {
	await page.goto('/sign-in', { waitUntil: 'networkidle' });

	await page.getByLabel('Seu e-mail').fill('wrong@example.com');
	await page.getByRole('button', { name: 'Acessar painel' }).click();

	const toast = page.getByText('Credenciais inválidas.');

	await expect(toast).toBeVisible();
});

test('Navigate to new restaurant page', async ({ page }) => {
	await page.goto('/sign-in', { waitUntil: 'networkidle' });

	await page.getByRole('link', { name: 'Novo estabelecimento' }).click();

	expect(page.url()).toContain('/sign-up');
});
