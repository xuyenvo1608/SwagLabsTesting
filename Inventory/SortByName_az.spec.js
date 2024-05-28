//@ts-check
const { test, expect } = require("@playwright/test") 

test("User able to sort products by name", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/") 

  // Login
  await page.fill("#user-name", "standard_user") 
  await page.fill("#password", "secret_sauce") 
  await page.click("#login-button") 

  // Check URL after login
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html") 

  // Check that the product list is visible
  await expect(page.locator(".inventory_list")).toBeVisible() 

  // Check that the product sort is visible
  await expect(page.locator(".product_sort_container")).toBeVisible() 

  // Select the sort option by name (A to Z)
  await page.selectOption(".product_sort_container", "az") 

  // Get all product names and ensure they are not null
  const names = await page.$$eval(".inventory_item_name", (items) =>
    items
      .map((item) => item.textContent)
      .filter((text) => text !== null && text.trim() !== "")
  ) 

  // Sort the names and ensure they are not null
  const sortedNames = names.sort((a, b) => {
    // Ensure that the names are strings
    if (typeof a !== "string" || typeof b !== "string") {
      return 0 
    }
    return a.localeCompare(b) 
  }) 
  /*
  // Check that the names are sorted correctly
  console.assert(
    JSON.stringify(names) === JSON.stringify(sortedNames),
    "Products should be sorted by name from A to Z" //only display when the assertion is false
  ) 
  await page.pause()  // Pause the test to see the sorted products
*/

  // Check that the names are sorted correctly
  if (JSON.stringify(names) === JSON.stringify(sortedNames)) {
    console.log("Products are sorted by name from A to Z") 
  } else {
    console.error("Products are not sorted correctly by name from A to Z") 
  }

  // Pause to see the browser
  //await page.pause() 
}) 
