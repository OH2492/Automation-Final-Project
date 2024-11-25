import {expect, test} from '@playwright/test'

// i added const to the variables. i'm assuming that you wanted to create an object that will contain all of the user types.
const correctusername = 'standard_user'
const incorrectusername = 'locked_out_user'
const emptyusername = ''
const emptypassword = ''
const correctpassword = 'secret_sauce'
const incorrectpassword = 'secretsauc'

const userlist = [
    {
        username: correctpassword,
        password: incorrectpassword,
        errormessage:
            'Epic sadface: Username and password do not match any user in this service',
    },
    {
        username: incorrectusername,
        password: correctpassword,
        errormessage: 'Epic sadface: Sorry, this user has been locked out.',
    },
    {
        username: incorrectusername,
        password: incorrectpassword,
        errormessage:
            'Epic sadface: Username and password do not match any user in this service',
    },
    {
        username: emptyusername,
        password: correctpassword,
        errormessage: 'Epic sadface: Username is required',
    },
    {
        username: correctusername,
        password: emptypassword,
        errormessage: 'Epic sadface: Password is required',
    },
    {
        username: emptyusername,
        password: emptypassword,
        errormessage: 'Epic sadface: Username is required',
    },
]

test.describe('Negative login Test', () => {
    test('login with incorrect username', async ({page}) => {
        await page.goto('https://www.saucedemo.com/')
        await page.locator('[data-test="username"]').click()
        await page.locator('[data-test="username"]').fill('locked_out_user')
        await page.locator('[data-test="password"]').click()
        await page.locator('[data-test="password"]').fill('secret_sauce')
        await page.locator('[data-test="login-button"]').click()
        await expect(page.locator('[data-test="error"]')).toContainText(
            'Epic sadface: Sorry, this user has been locked out.',
        )
    })

    for (let user of userlist) {
        test(`${user.username === '' ? 'empty password' : user.username} ,${
            user.password === '' ? 'empty passowrd' : user.password
        }`, async ({page}) => {
            await page.goto('https://www.saucedemo.com/')
            await page.locator('[data-test="username"]').click()
            await page.locator('[data-test="username"]').fill(user.username)
            await page.locator('[data-test="password"]').click()
            await page.locator('[data-test="password"]').fill(user.password)
            await page.locator('[data-test="login-button"]').click()
            await expect(page.locator('[data-test="error"]')).toHaveText(
                user.errormessage,
            )
        })
    }
})
