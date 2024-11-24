import { expect, test } from "@playwright/test";

test.describe("PositiveTest", () => {
  test("test1", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator('[class="app_logo"]')).toHaveText("Swag Labs");
  });

  test("Test2", async ({ page }) => {
    const Accepted_usernames = [
      "problem_user",
      "performance_glitch_user",
      "error_user",
      "visual_user",
    ];
    for (let i = 0; i < Accepted_usernames.length; i++) {
      await page.goto("https://www.saucedemo.com/");
      await page.locator('[data-test="username"]').click();
      await page.locator('[data-test="username"]').fill(Accepted_usernames[i]);
      await page.locator('[data-test="password"]').click();
      await page.locator('[data-test="password"]').fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await expect(page.locator('[class="app_logo"]')).toHaveText("Swag Labs");
    }
  });
});
