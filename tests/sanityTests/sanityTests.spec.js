import { expect, test } from "@playwright/test";

test.describe("SanityTests", () => {
  test("test1", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator('[class="app_logo"]')).toHaveText("Swag Labs");

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();
    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toContainText("2");
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await expect(page.locator('[data-test="secondary-header"]')).toHaveText(
      "Your Cart"
    );
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    await expect(page.locator('[data-test="secondary-header"]')).toHaveText(
      "Checkout: Your Information"
    );
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill("omri");
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill("hober");
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill("123456");
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    await expect(page.locator('[data-test="secondary-header"]')).toHaveText(
      "Checkout: Overview"
    );
    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html"
    );
    await expect(page.locator('[data-test="secondary-header"]')).toHaveText(
      "Checkout: Complete!"
    );
    await expect(page.locator('[data-test="complete-header"]')).toContainText(
      "Thank you for your order!"
    );
    await expect(page.locator('[data-test="complete-text"]')).toContainText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  });
});
