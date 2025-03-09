import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByRole('textbox', { name: 'USERNAME' }).click();
  await page.getByRole('textbox', { name: 'USERNAME' }).fill('test');
  await page.getByRole('textbox', { name: 'EMAIL' }).click();
  await page.getByRole('textbox', { name: 'EMAIL' }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'PASSWORD', exact: true }).click();
  await page.getByRole('textbox', { name: 'PASSWORD', exact: true }).fill('123456');
  await page.getByRole('textbox', { name: 'CONFIRM PASSWORD' }).click();
  await page.getByRole('textbox', { name: 'CONFIRM PASSWORD' }).fill('123456');
  await page.getByRole('button', { name: 'REGISTER' }).click();
});