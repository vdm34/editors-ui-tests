import playwright from 'playwright';
import {allureStepDecorator} from "../../../reporter/reporter";

const selectors = {}

export class PageSteps {
    page: playwright.Page;

    constructor(page: playwright.Page) {
        this.page = page;
    }

    // @allureStepDecorator('open url') почему то не работает декоратор аллюра :(
    openUrl(url: string) {
        this.page.goto (url)
    }

    wait(ms: number) {
        this.page.waitForTimeout(ms)
    }
}
