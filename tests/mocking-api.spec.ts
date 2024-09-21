import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json'

test.beforeEach(async ({page})=>{
   //seting up the mock
   await page.route('*/**/api/tags', async route =>{
   await route.fulfill({
        body: JSON.stringify(tags)
    })
   }) 

   // */**/api/tags the stars represent any patern match on the url i.e wildcard

   //Modify api response
   await page.route('*/**/api/articles?*', async route=>{
    const response = await route.fetch()
    const responseBody = await response.json()
    responseBody.articles[0].title = "This is a test title"
    responseBody.articles[0].description = "This is a test description"

    await route.fulfill({
        body:JSON.stringify(responseBody)
    })
   })


   await page.goto('https://conduit.bondaracademy.com',{waitUntil:'networkidle'})
})

test('Verify the mocked api', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');

 
});

test('Verify the modification of the response', async({page})=>{
    await expect(page.locator('app-article-list h1').first()).toContainText('This is a test title')
    await expect(page.locator('app-article-list p').first()).toContainText('This is a test description')
})