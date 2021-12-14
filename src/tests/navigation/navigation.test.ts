import {config} from "../../../config/config";
import playwright from "playwright";
import {setupBrowser} from "../../../playwright.config";
import {expect, test} from "@playwright/test";
import {PageSteps} from "./steps/pageSteps";



const url = config.url

test.describe('describe name: ', async () => {

    test('test name: ', async () => {
        let page: playwright.Page, browser: playwright.Browser, pageSteps: PageSteps
        ({page, browser} = await setupBrowser('chromium'))
        pageSteps = new PageSteps(page)

        await pageSteps.openUrl(url)
        await pageSteps.wait(2000)
        await page.click('text=navigation')
        let expectingClick = await page.click('text=demo');
        expect(expectingClick);
        await page.waitForTimeout(3000)
    })

})