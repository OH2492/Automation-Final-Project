// click
const click = await page.locator('[data-test="username"]').click() // make it a function like this

export async function clickOnLocator(page) {
    await page.locator('[data-test="username"]').click()
}

// then you will import this function and pass 'page' object to the function.
// if its complicated, tell me and i will show you how.