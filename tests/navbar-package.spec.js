import { test, expect } from '@playwright/test';

test('navigation to Package page from Navbar', async ({ page }) => {

  await page.goto('http://localhost:3000'); 

  await page.click('text=PACKAGE');
  await expect(page).toHaveURL('http://localhost:3000/Package'); 
  await expect(page.locator('h1')).toContainText('All Tour package');

});
