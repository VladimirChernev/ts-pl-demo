import { test, expect } from '@playwright/test';

test(`Login with valid creds`, { tag: ['@ui'] }, async ({ page }) => {

  await page.goto('https://st2016.inv.bg/');
  await expect(page).toHaveTitle('Вход - QA Ground');

  await page.locator('#loginusername').fill('karamfilovs@gmail.com');
  await page.locator('#loginpassword').fill('111111');
  await expect(page.locator(`//label[@class='login-language-label selenium-label-language-id-BG']//input[@type='radio']`)).toBeChecked();

  await page.locator('#loginsubmit').click();
  await expect(page).toHaveTitle('Система за фактуриране - QA Ground');
});

test(`Login with bad creds`, { tag: ['@ui'] }, async ({ page }) => {
  await page.goto('https://st2016.inv.bg/');
  await expect(page).toHaveTitle('Вход - QA Ground');

  await page.locator('#loginusername').fill('karamfilovs@gmail.com');
  await page.locator('#loginpassword').fill('wrongpassword');
  await expect(page.locator(`//label[@class='login-language-label selenium-label-language-id-BG']//input[@type='radio']`)).toBeChecked();

  await page.locator('#loginsubmit').click();
  await expect(page).toHaveTitle('Вход - QA Ground');
  await expect(page.locator('#error')).toContainText('Грешно потребителско име или парола. Моля, опитайте отново.');
});

test(`Login with  blank creds`, { tag: ['@ui'] }, async ({ page }) => {
  await page.goto('https://st2016.inv.bg/');
  await expect(page).toHaveTitle('Вход - QA Ground');

  await page.locator('#loginusername').fill('');
  await page.locator('#loginpassword').fill('');
  await expect(page.locator(`//label[@class='login-language-label selenium-label-language-id-BG']//input[@type='radio']`)).toBeChecked();

  await page.locator('#loginsubmit').click();
  await expect(page).toHaveTitle('Вход - QA Ground');
  await expect(page.locator('#error')).toContainText('Моля, попълнете вашия email');
});

test(`Login & logout`, { tag: ['@ui'] }, async ({ page }) => {
  await page.goto('https://st2016.inv.bg/');
  await expect(page).toHaveTitle('Вход - QA Ground');

  await page.locator('#loginusername').fill('karamfilovs@gmail.com');
  await page.locator('#loginpassword').fill('111111');
  await expect(page.locator(`//label[@class='login-language-label selenium-label-language-id-BG']//input[@type='radio']`)).toBeChecked();

  await page.locator('#loginsubmit').click();
  await expect(page).toHaveTitle('Система за фактуриране - QA Ground');

  await page.locator('#userpanel').click();
  await page.getByRole('link', { name: 'Изход' }).click();
  await expect(page).toHaveTitle('Вход - QA Ground');
  await expect(page.locator('#okmsg')).toContainText('Вие излязохте от акаунта си.');
});