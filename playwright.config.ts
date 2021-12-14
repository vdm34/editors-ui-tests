import {PlaywrightTestConfig, devices} from '@playwright/test'
import playwright from "playwright";

const WIDTH = 1600;
const HEIGHT = 900;
const HEADLESS = false

const config: PlaywrightTestConfig = {
    use: {
        screenshot: 'only-on-failure',
        video: 'retry-with-video'
    },
    reporter: [
        ['line'],
        ['allure-playwright']
    ],
    timeout: 0.5 * 60 * 1000,
    retries: 2,
}

export default config

export async function setupBrowser(browserType: 'chromium' | 'firefox' | 'webkit', device?: string ): Promise<{page:playwright.Page,browser:playwright.Browser}> {
    let contextParam: object = {};
    let args: Array<string> = [];

    if (device) {
        contextParam = {
            ...devices[device],
            locale: 'en-US',
        }
    }
    let browser = await playwright[browserType].launch({
        headless: HEADLESS,
        args
    });
    const context = await browser.newContext(contextParam);
    let page = await context.newPage();
    if(!device) {
        await page.setViewportSize({width:WIDTH, height:HEIGHT});
    }
    return {page, browser};
}