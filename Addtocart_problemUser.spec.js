//@ts-check
const { test, expect } = require("@playwright/test")
test("User able to add product to cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/")
  await page.fill("#user-name", "problem_user")
  await page.fill('//input[@id="password"]', "secret_sauce") 
  await page.click('//input[@id="login-button"]')
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
  // Save the original text of the button before adding to cart
  const initialButtonText = await page.textContent(
    "//button[@id='add-to-cart-sauce-labs-backpack']"
  ) 
  // Click on the "Add to cart" button
  await page.click("//button[@id='add-to-cart-sauce-labs-backpack']")

  // Check if the button has changed to "Remove"
  const finalButtonText = await page.textContent(
    "//button[@id='remove-sauce-labs-backpack']"
  ) 
  expect(finalButtonText).not.toEqual(initialButtonText) 
  expect(finalButtonText).toContain("Remove")
  //Check if the product is added to the cart
  const cartCountAfterAdd = await page.textContent("//span[@class='shopping_cart_badge']")
  await expect(cartCountAfterAdd).toEqual("1")
}) 
test("User able to remove product from cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/")
  await page.fill("#user-name", "problem_user")
  await page.fill('//input[@id="password"]', "secret_sauce") 
  await page.click('//input[@id="login-button"]')
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
  await page.click("//button[@id='add-to-cart-sauce-labs-backpack']")
  // Save the original text of the button before removing from cart
  const initialButtonText = await page.textContent(
    "//button[@id='remove-sauce-labs-backpack']"
  ) 

  // Click on the "Remove" button
  await page.click("//button[@id='remove-sauce-labs-backpack']")

  // Check if the button has changed to "Add to cart"
  const finalButtonText = await page.textContent(
    "//button[@id='add-to-cart-sauce-labs-backpack']"
  ) 
  expect(finalButtonText).not.toEqual(initialButtonText) 
  expect(finalButtonText).toContain("Add to cart")
  //Check if the product is removed from the cart
  await expect(page.locator("//span[@class='shopping_cart_badge']")).toBeHidden()
  if (finalButtonText === "Add to cart") {
    console.log("Product is removed from the cart")
  } else {
    console.error("Product is not removed from the cart")
  }
  await page.close() 
}) 
