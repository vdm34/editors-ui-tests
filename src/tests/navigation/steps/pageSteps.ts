import playwright from 'playwright';
import {allureStepDecorator} from "../../../reporter/reporter";

const selectorsHomePageMenu = {
    selectorWithText: (text: string) => {
        return `text=${text}`
    },
}
const selectorsNavigationPage = {
    navigaitonFrame: `[title="Navigation Demo"]`,
    loadDocumentButton: `div.Navigation_panel__3bzMU > button:nth-child(2)`,
    pageCountsInput: `input[type="text"]`,
    loadPageButton: `div.Navigation_panel__3bzMU > button:nth-child(3)`,
    firstPage: `#navigation-scrollbox > div > div > div:nth-child(1) > div`
}


export class PageSteps {
    page: playwright.Page;

    constructor(page: playwright.Page) {
        this.page = page;
    }

    // @allureStepDecorator('open url') нужно настроить бабель
    openUrl(url: string) {
        return this.page.goto(url)
    }

    wait(ms: number) {
        return this.page.waitForTimeout(ms)
    }

    clickOnButtonWithText(text: string) {
        return this.page.click(selectorsHomePageMenu.selectorWithText(text))
    }

    async getFrame(selector: string) {
        const frame = await this.page.$(selector)
        // @ts-ignore
        return await frame.contentFrame()
    }

    clickOnLoadDocumentButton(frameSelect: any) {
        return frameSelect.click(selectorsNavigationPage.loadDocumentButton)
    }

    clickOnPageInputAndFill(frameSelect: any, countOfPages: string) {
        return frameSelect.click(selectorsNavigationPage.pageCountsInput).then(() => {
            return frameSelect.fill(selectorsNavigationPage.pageCountsInput, countOfPages)
        })
    }

    clickOnLoadPage(frameSelect: any) {
        return frameSelect.click(selectorsNavigationPage.loadPageButton)
    }

    waitForPageLoaded(frameSelect: any) {
        return frameSelect.waitForSelector(selectorsNavigationPage.firstPage)
    }
}
