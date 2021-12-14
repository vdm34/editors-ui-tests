import {config} from "../../../config/config";
import {it, describe, beforeEach} from 'playwright-runner'
import {PageSteps} from "./steps/pageSteps";
import playwright from "playwright";
import {setupBrowser} from "../../../playwright.config";
import {expect} from "@playwright/test";



let url = config.url

describe('open url and some: ', async () => {
    let page: playwright.Page, browser: playwright.Browser, pageSteps: PageSteps

    beforeEach(async () => {
        ({page, browser} = await setupBrowser('chromium'))
        pageSteps = new PageSteps(page);
        await pageSteps.openUrl(url)
        console.log (url)
    })

    it('open url: ', async () => {
        await pageSteps.wait(5000)
        expect(`class["Layout_title__2xo6C"]`)
    })
})