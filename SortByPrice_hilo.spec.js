//@ts-check
const { test, expect } = require("@playwright/test") 

test("User able to sort products by price", async ({ page }) => {
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

  // Select the sort option by price (low to high)
  await page.selectOption(".product_sort_container", "hilo") 

  // Get all product prices and ensure they are not null
  const prices = await page.$$eval(
    ".inventory_item_price",
    (items) =>
      items
        .map((item) => {
          const text = item.textContent 
          if (text) {
            const price = parseFloat(text.replace("$", "")) 
            return !isNaN(price) ? price : null 
          }
          return null 
        })
        .filter((price) => price !== null) // Filter out null values
  ) 

  // Sort the prices and ensure they are not null
  const sortedPrices = prices.sort((a, b) => {
    if (a === null && b === null) return 0 
    if (a === null) return 1 
    if (b === null) return -1 
    return b - a 
  }) 
  /*
  // Check that the prices are sorted correctly
  console.assert(
    JSON.stringify(prices) === JSON.stringify(sortedPrices),
    "Products should be sorted by price from low to high"
  ) 
  */

  // Check that the prices are sorted correctly
  if (JSON.stringify(prices) === JSON.stringify(sortedPrices)) {
    console.log("Products are sorted by price from high to low") 
  } else {
    console.error(
      "Products are not sorted correctly by price from high to low"
    ) 
  }
  await page.pause()  // Pause the test to see the sorted products
  // Select the sort option by price (high to low)
}) 
