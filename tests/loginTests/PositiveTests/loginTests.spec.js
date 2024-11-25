import { expect, test } from "@playwright/test";

test.describe("Login Positive Tests", () => {
  test("login with valid username and valid password", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator('[class="app_logo"]')).toHaveText("Swag Labs");
  });

  const validUsers = [
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user",
  ];

  for (let username of validUsers) {
    test(`login with ${username} username and valid password`, async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
      await page.locator('[data-test="username"]').click();
      await page.locator('[data-test="username"]').fill(username);
      await page.locator('[data-test="password"]').click();
      await page.locator('[data-test="password"]').fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await expect(page.locator('[class="app_logo"]')).toHaveText("Swag Labs");
    });
  }
});
