//@ts-check
const { test, expect } = require("@playwright/test") 
test ("User able to check out after added product to cart", async ({ page }) => {
    page.goto("https://www.saucedemo.com/")

    //Login
    await page.fill("#user-name", "standard_user")
    await page.fill("#password", "secret_sauce")
    await page.click("#login-button")

    //Check URL after login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    //Check product list
    await expect(page.locator(".inventory_list")).toBeVisible()

    //Add product to cart
    await page.click("//button[@id='add-to-cart-sauce-labs-backpack']")

    //Check cart count
    const cartCountAfterAdd = await page.textContent("//span[@class='shopping_cart_badge']")
    await expect(cartCountAfterAdd).toEqual("1")

    //Checkout
    await page.click("//a[@class='shopping_cart_link']")
    await page.click("//button[@id='checkout']")
    await page.fill("#first-name", "John")
    await page.fill("#last-name", "Doe")
    await page.fill("#postal-code", "12345")
    await page.click("//input[@id='continue']")

    //Check product list
    await expect(page.locator(".cart_list")).toBeVisible()
    await expect(page.locator(".summary_info")).toBeVisible()
    await page.click("//button[@id='finish']")

    //Check order complete
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
    await expect(page.locator(".complete-header")).toBeVisible()
    await expect(page.locator(".checkout_complete_container")).toBeVisible()

    //Back to home
    await page.click("//button[@id='back-to-products']")
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    page.close()
})
test ("User cannot checkout if first name is empty", async ({ page }) => {
    page.goto("https://www.saucedemo.com/")

    //Login
    await page.fill("#user-name", "standard_user")
    await page.fill("#password", "secret_sauce")
    await page.click("#login-button")

    //Check URL after login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    //Check product list
    await expect(page.locator(".inventory_list")).toBeVisible()

    //Add product to cart
    await page.click("//button[@id='add-to-cart-sauce-labs-backpack']")

    //Check cart count
    const cartCountAfterAdd = await page.textContent("//span[@class='shopping_cart_badge']")
    await expect(cartCountAfterAdd).toEqual("1")

    //Checkout
    await page.click("//a[@class='shopping_cart_link']")
    await page.click("//button[@id='checkout']")
    await page.click("//input[@id='continue']")
    await expect(page.locator("//h3[text()='Error: First Name is required']")).toBeVisible()
    page.close()

    //User cannot checkout if last name is empty
    //User cannot checkout if postal code is empty
})