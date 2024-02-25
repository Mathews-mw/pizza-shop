import { expect, test } from '@playwright/test';

test('Update profile successfully', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' });

	await page.getByRole('button', { name: 'Pizza Shop' }).click();
	await page.getByRole('menuitem', { name: 'Perfil da loja' }).click();

	await page.getByLabel('Nome').fill('Master Pizza');
	await page.getByLabel('Descrição').fill('Another Description');

	await page.getByRole('button', { name: 'Salvar' }).click();

	await page.waitForLoadState('networkidle'); // indica para o teste esperar todas as requisições http serem concluídas antes de prosseguir

	const toast = page.getByText('Perfil atualizado com sucesso.');

	expect(toast).toBeVisible();

	await page.getByRole('button', { name: 'Close' }).click();

	await expect(page.getByRole('button', { name: 'Master Pizza' })).toBeVisible();
});
