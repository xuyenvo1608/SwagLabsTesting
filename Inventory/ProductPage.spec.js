//@ts-check
const { test, expect } = require("@playwright/test");

test("User able to view product page", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Login
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator(".inventory_list")).toBeVisible();
  await expect(page).toHaveTitle("Swag Labs");
  await expect(page.locator(".app_logo")).toContainText("Swag Labs");
  await expect(page.locator(".app_logo")).toBeVisible();

  // Check that all product name is visible
  const products = await page.$$("//div[@class='inventory_list']//div/a");
  for (const product of products) {
    const productName = await product.textContent();
    console.log(productName);
  }
  await page.close();
});
