import { Page, BrowserContext, Locator, test } from '@playwright/test';
import { testConfig } from '@testconfig';
import { ENV } from '@playwright.config';
import path from 'path';

export class WebActions {
  public readonly page: Page;
  public readonly context: BrowserContext;

  /**
   * Creates an instance of WebActions.
   * @param {Page} page - Playwright Page object representing the web page
   * @param {BrowserContext} context - Playwright BrowserContext object for the current browser context
   */
  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  // playwright webactions documentation: https://playwright.dev/docs/input

  /**
   * Navigates browser to web page
   * @param {string} url - post domain part of a web page's url
   */
  async navigateTo(url: string) {
    await test.step(`Navigate to webpage: "${testConfig[ENV]['url']}${url}"`, async () => {
      await this.page.goto(url);
    });
  }

  /**
   * Click on element
   * @param {Locator} locator - web element locator
   * @param {string} [elementName="element"] - web element name, has default value
   */
  async click(locator: Locator, elementName: string = 'element') {
    await test.step(`Click on "${elementName}"`, async () => {
      await locator.click();
    });
  }

  /**
   * Double click on element
   * @param {Locator} locator - web element locator
   * @param {string} [elementName="element"] - web element name, has default value
   */
  async doubleClick(locator: Locator, elementName: string = 'element') {
    await test.step(`Double click on "${elementName}"`, async () => {
      await locator.dblclick();
    });
  }

  /**
   * Shift + click on element
   * @param {Locator} locator - web element locator
   * @param {string} [elementName="element"] - web element name, has default value
   */
  async shiftClick(locator: Locator, elementName: string = 'element') {
    await test.step(`Shift + click on "${elementName}"`, async () => {
      await locator.click({ modifiers: ['Shift'] });
    });
  }

  /**
   * Ctrl + click on element for Windows and Linux and Meta + click on macOS
   * @param {Locator} locator - web element locator
   * @param {string} [elementName="element"] - web element name, has default value
   */
  async ctrClick(locator: Locator, elementName: string = 'element') {
    await test.step(`Control + click on "${elementName}"`, async () => {
      await locator.click({ modifiers: ['ControlOrMeta'] });
    });
  }

  /**
   * Hover on element
   * @param {Locator} locator - web element locator
   * @param {string} [elementName="element"] - web element name, has default value
   */
  async hover(locator: Locator, elementName: string = 'element') {
    await test.step(`Hover on "${elementName}"`, async () => {
      await locator.hover();
    });
  }

  /**
   * Fill input field
   * @param {Locator} locator - input field locator
   * @param {string} value - value to be filled in
   * @param {string} [elementName="input element"] - web element name, has default value
   */
  async fillInput(locator: Locator, value: string, elementName: string = 'element') {
    await test.step(`Fill "${elementName}" with value "${value}"`, async () => {
      await locator.fill(value);
    });
  }

  /**
   * Select an option from a dropdown menu
   * @param {Locator} locator - dropdown menu locator
   * @param {string} value - option value to be selected
   * @param {string} [elementName="dropdown element"] - web element name, has default value
   */
  async selectOption(locator: Locator, value: string, elementName: string = 'element') {
    await test.step(`Select option "${value}" from "${elementName}"`, async () => {
      await locator.selectOption(value);
    });
  }

  /**
   * Get text content from an element
   * @param {Locator} locator - element locator
   * @param {string} [elementName="element"] - web element name, has default value
   * @returns {Promise<string | null>} - the text content of the element
   */
  async textContent(locator: Locator, elementName: string = 'element'): Promise<string | null> {
    return await test.step(`Get text from "${elementName}"`, async () => {
      return await locator.textContent();
    });
  }

  /**
   * Upload a file to an input element
   * @param {Locator} locator - element locator
   * @param {string} fileName - name of the file to be uploaded
   * @param {string} [elementName="element"] - web element name, has default value
   */
  async uploadFile(locator: Locator, fileName: string, elementName: string = 'element') {
    await test.step(`Upload file to "${elementName}"`, async () => {
      await locator.setInputFiles(path.join(__dirname, '..', '..', 'resources', 'files', fileName));
    });
  }
}
