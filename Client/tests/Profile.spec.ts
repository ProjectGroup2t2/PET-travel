import { test, expect } from '@playwright/test';

test('update their profile successfully', async ({ page }) => {
  await page.goto('/Profile');

  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="email"]', 'johndoe@example.com');
  await page.fill('input[name="phonePrefix"]', '+66');
  await page.fill('input[name="phoneNumber"]', '912345678');

  await page.click('button:has-text("Save Changes")');

  await page.reload();
  await page.waitForTimeout(5000);
});