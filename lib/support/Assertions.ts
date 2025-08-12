import { test, Page, BrowserContext, Locator, expect } from '@playwright/test';

export class Assertions {
  public readonly page: Page;
  public readonly context: BrowserContext;

  /**
   * Creates an instance of Assertions.
   * @param {Page} page - Playwright Page object
   * @param {BrowserContext} context - Playwright BrowserContext object
   */
  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  // playwright assertion documentation: https://playwright.dev/docs/test-assertions

  /**
   * @param {string} pageTitle - expected Page title
   */
  async verifyPageTitle(pageTitle: string) {
    await test.step(`Verify actual page title agains expected page title: "${pageTitle}"`, async () => {
      await expect.soft(this.page).toHaveTitle(pageTitle);
    });
  }

  /**
   * @param {Locator} locator - element to verify is visible
   * @param {string} [elementName="element"] - web element name with default value
   * @param {number} [expectTimeout=15_000] - custom expect timeout in milliseconds (default is 15 seconds)
   */
  async verifyElementVisible(locator: Locator, elementName: string = 'element', expectTimeout: number = 15_000) {
    await test.step(`Verify "${elementName}" is visible`, async () => {
      await expect.soft(locator, `${locator}`).toBeVisible({ timeout: expectTimeout });
    });
  }

  /**
   * @param {Locator} locator - element to verify is hidden
   * @param {string} [elementName="element"] - web element name with default value
   * @param {number} [expectTimeout=15_000] - custom expect timeout in milliseconds (default is 15 seconds)
   */
  async verifyElementHidden(locator: Locator, elementName: string = 'element', expectTimeout: number = 15_000) {
    await test.step(`Verify "${elementName}" is hidden`, async () => {
      await expect.soft(locator, `${locator}`).toBeHidden({ timeout: expectTimeout });
    });
  }

  /**
   * @param {Locator} locator - element containing text
   * @param {string} substring - te be found in text
   * @param {string} [elementName="element"] - web element name with default value
   */
  async verifyElementContainsText(locator: Locator, substring: string, elementName: string = 'element') {
    await test.step(`Verify "${elementName}" contains text "${substring}"`, async () => {
      await expect.soft(locator, `${locator}`).toContainText(substring);
    });
  }

  /**
   * @param {Locator} locator - element containing text
   * @param {string} expectedValue - to be compared to element text
   * @param {string} [elementName="element"] - web element name with default value
   */
  async verifyElementMatchesText(locator: Locator, expectedValue: string, elementName: string = 'element') {
    await test.step(`Verify "${elementName}" matches text exactly "${expectedValue}"`, async () => {
      await expect.soft(locator, `${locator}`).toHaveText(expectedValue);
    });
  }

  /**
   * Verify that two string values match, with a custom field name for reporting.
   * @param {string} actual - The actual value to be compared.
   * @param {string} expected - The expected value to compare against.
   * @param {string} fieldName - The name of the field being compared (used in the report).
   */
  async verifyValuesMatch(actual: string, expected: string, fieldName: string) {
    await test.step(`Verify "${fieldName}" matches. Actual: "${actual}", Expected: "${expected}"`, async () => {
      expect.soft(actual).toBe(expected);
    });
  }

  /**
   * Verify that an input field has the expected value.
   * @param {Locator} locator - The locator of the input field.
   * @param {string} expectedValue - The expected value inside the input field.
   * @param {string} fieldName - The name of the field for reporting purposes.
   */
  async verifyElementHasValue(locator: Locator, expectedValue: string, fieldName: string) {
    await test.step(`Verify "${fieldName}" has value "${expectedValue}"`, async () => {
      await expect.soft(locator).toHaveValue(expectedValue);
    });
  }

  /**
   * Verify that a web element is enabled.
   * @param {Locator} locator - The locator of the element to check.
   * @param {string} fieldName - The name of the field for reporting purposes.
   */
  async verifyElementIsEnabled(locator: Locator, fieldName: string) {
    await test.step(`Verify "${fieldName}" is enabled`, async () => {
      await expect.soft(locator).toBeEnabled();
    });
  }
}
