import { test, expect } from '@playwright/test';

test('Can login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="username"]', 'yim');
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000');
});
