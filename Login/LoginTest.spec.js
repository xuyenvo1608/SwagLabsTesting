//@ts-check
const { test, expect } = require("@playwright/test") 
test("User login with a valid name and valid password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/") 

  //The list of valid usernames
  const validUsernames = [
    "standard_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user",
  ] 

  //Loop through the list of valid usernames
  for (const username of validUsernames) {
    await page.fill("#user-name", username) 
    await page.fill('//input[@id="password"]', "secret_sauce") 
    //await page.click('//input[@id="login-button"]') 

    //enter key press
    await page.locator('//input[@id="login-button"]').press("Enter")

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html") 
    await expect(page).toHaveTitle("Swag Labs") 

    //Check that the product list is visible
    await page.waitForSelector(".inventory_list") 
    const inventoryList = await page.locator(".inventory_list") 
    await expect(inventoryList).toBeVisible() 
    console.log(username + " is logged in") 
    await page.click("//button[@id='react-burger-menu-btn']") 
    await page.click("//a[@id='logout_sidebar_link']") 
  }
  await page.close() 
}) 

test("User login with account locked out", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/") 
  await page.fill("#user-name", "locked_out_user") 
  await page.fill('//input[@id="password"]', "secret_sauce") 
  await page.click('//input[@id="login-button"]') 
  const error = await page.locator('h3[data-test="error"]') 
  await expect(error).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  ) 
  console.log("Locked out user is not logged in") 
  await page.close() 
}) 

test("User login with a valid name and invalid password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/") 
  //The list of valid usernames
  const validUsernames = [
    "standard_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user",
  ] 
  for (const username of validUsernames) {
    await page.fill("#user-name", username) 
    await page.fill('//input[@id="password"]', "123456") 
    await page.click('//input[@id="login-button"]') 
    const error = await page.locator('h3[data-test="error"]') 
    await expect(error).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    ) 
    console.log(username + " is not logged in") 
  }
  await page.close() 
}) 

test("User login with invalid name and valid password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/") 
  await page.fill("#user-name", "invalid_user") 
  await page.fill('//input[@id="password"]', "secret_sauce") 
  await page.click('//input[@id="login-button"]') 
  const error = await page.locator('h3[data-test="error"]') 
  await expect(error).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  ) 
  console.log("Invalid user is not logged in") 
  await page.close() 
}) 

test("User does not enter a name and password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/") 
  await page.click('//input[@id="login-button"]') 
  const error = await page.locator('h3[data-test="error"]') 
  await expect(error).toHaveText("Epic sadface: Username is required") 
  console.log("User does not enter a name and password")
  await page.close()
})
