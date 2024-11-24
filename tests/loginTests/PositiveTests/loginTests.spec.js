import {expect, test} from '@playwright/test'

test.describe('LoginPositiveTest', () => {
    test('valid username', async ({page}) => {
        // give a meaningful test case name. that's not a good name
        await page.goto('https://www.saucedemo.com/')
        await page.locator('[data-test="username"]').click()
        await page.locator('[data-test="username"]').fill('standard_user')
        await page.locator('[data-test="password"]').click()
        await page.locator('[data-test="password"]').fill('secret_sauce')
        await page.locator('[data-test="login-button"]').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.locator('[class="app_logo"]')).toHaveText('Swag Labs')
    })

    test('all users names', async ({page}) => {
        // give a meaningful test case name. that's not a good name
        const Accepted_usernames = [
            // Capitalize the first letter of the variable name is only for Classes. use accepted_usernames
            'problem_user',
            'performance_glitch_user',
            'error_user',
            'visual_user',
        ]
        for (let i = 0; i < Accepted_usernames.length; i++) { // use for of loop please
            await page.goto('https://www.saucedemo.com/')
            await page.locator('[data-test="username"]').click()
            await page
                .locator('[data-test="username"]')
                .fill(Accepted_usernames[i])
            await page.locator('[data-test="password"]').click()
            await page.locator('[data-test="password"]').fill('secret_sauce')
            await page.locator('[data-test="login-button"]').click()
            await expect(page).toHaveURL(
                'https://www.saucedemo.com/inventory.html',
            )
            await expect(page.locator('[class="app_logo"]')).toHaveText(
                'Swag Labs',
            )
        }
    })
})
