import {config} from "../../../config/config";
import playwright from "playwright";
import {setupBrowser} from "../../../playwright.config";
import {expect, test} from "@playwright/test";
import {PageSteps} from "./steps/pageSteps";



const url = config.url

test.describe.parallel('simple tests for navigation: ', async () => {
    let page: playwright.Page, browser: playwright.Browser, pageSteps: PageSteps, frame: any

    test.beforeEach(async () => {
        ({page, browser} = await setupBrowser('chromium'))
        pageSteps = new PageSteps(page)
        await pageSteps.openUrl(url)
        await pageSteps.clickOnButtonWithText('navigation')
        await pageSteps.clickOnButtonWithText('demo')
        await pageSteps.wait(5000)
        // @ts-ignore
        frame = await pageSteps.getFrame('[title="Navigation Demo"]')
    })

    test('open demo and check that document is loaded: ', async () => {
        await pageSteps.clickOnPageInputAndFill(frame, '5')
        await pageSteps.clickOnLoadDocumentButton(frame)
        await pageSteps.wait(2000)
        await pageSteps.clickOnLoadPage(frame)
        await pageSteps.wait(1000)
        let expectedRes = await pageSteps.waitForPageLoaded(frame)
        expect(expectedRes)
    })

    test('failed test with change count of pages: ', async () => {
        await pageSteps.clickOnPageInputAndFill(frame, '4')
        await pageSteps.clickOnLoadDocumentButton(frame)
        await pageSteps.wait(2000)
        await pageSteps.clickOnLoadPage(frame)
        await pageSteps.wait(1000)
        let expectedRes = await pageSteps.waitForPageLoaded(frame)
        expect(expectedRes)
    })

})