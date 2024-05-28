//@ts-check
const { test, expect } = require("@playwright/test")
test("User can click on name of product or image to view details", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/")
  await page.fill("#user-name", "standard_user")
  await page.fill("#password", "secret_sauce")
  await page.click("#login-button")
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
  await expect(page.locator(".inventory_list")).toBeVisible()

  //Click on the name of the product
  await page.click("//a[@id='item_4_title_link']")
  await expect(page.locator(".inventory_details_container")).toBeVisible()
  await page.click("//button[@id='back-to-products']")
  //Click on the image of the product
  await page.click("//a[@id='item_4_img_link']")
  await expect(page.locator(".inventory_details_container")).toBeVisible()
  await page.close()
})

test("Verify that the product details are correct", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/")
  await page.fill("#user-name", "standard_user")
  await page.fill("#password", "secret_sauce")
  await page.click("#login-button")
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
  await expect(page.locator(".inventory_list")).toBeVisible()

  //Click on the name of the product
  await page.click("//a[@id='item_4_title_link']")
  await expect(page.locator(".inventory_details_container")).toBeVisible()

  //Check the product name
  const productName = await page.textContent(
    "//div[@class='inventory_details_name large_size']"
  )
  await expect(productName).toContain("Sauce Labs Backpack")

  //Check the product description
  const productDescription = await page.textContent(
    "//div[@class='inventory_details_desc large_size']"
  )
  await expect(productDescription).toContain(
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
  )

  //Check the product price
  const productPrice = await page.textContent(
    "//div[@class='inventory_details_price']"
  )
  await expect(productPrice).toContain("$29.99") 

  //Check the product image
  const productImage = await page.locator(
    "//img[@alt='Sauce Labs Backpack']"
  )
  await expect(productImage).toBeVisible() 

  //Click on the back button
  await page.click("//button[@id='back-to-products']")

  await page.close()
}) 
