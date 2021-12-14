import playwright from 'playwright';
import {allureStepDecorator} from "../../../reporter/reporter";

const selectors = {}

export class PageSteps {
    page: playwright.Page;

    constructor(page: playwright.Page) {
        this.page = page;
    }

    // @allureStepDecorator('open url')
    openUrl(url: string) {
        return this.page.goto(url)
    }

    wait(ms: number) {
        return this.page.waitForTimeout(ms)
    }
}
