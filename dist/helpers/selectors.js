"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getButton = exports.getAccountMenuButton = exports.getErrorMessage = exports.getSettingsSwitch = exports.getInputByLabel = exports.getElementByTestId = exports.getElementByContent = void 0;
// TODO: change text() with '.';
const getElementByContent = (page, text, type = "*", options) => page.waitForXPath(`//${type}[contains(text(), '${text}')]`, {
    timeout: 20000,
    visible: true,
    ...options,
});
exports.getElementByContent = getElementByContent;
const getElementByTestId = (page, testId, options = {}) => page.waitForSelector(`[data-testid="${testId}"]`, {
    timeout: 20000,
    visible: true,
    ...options,
});
exports.getElementByTestId = getElementByTestId;
const getInputByLabel = (page, text, excludeSpan = false, timeout = 1000) => page.waitForXPath([
    `//label[contains(.,'${text}')]/following-sibling::textarea`,
    `//label[contains(.,'${text}')]/following-sibling::*//input`,
    `//h6[contains(.,'${text}')]/parent::node()/parent::node()/following-sibling::input`,
    `//h6[contains(.,'${text}')]/parent::node()/parent::node()/following-sibling::*//input`,
    ...(!excludeSpan
        ? [
            `//span[contains(.,'${text}')]/parent::node()/parent::node()/following-sibling::*//input`,
            `//span[contains(.,'${text}')]/following-sibling::*//input`,
        ]
        : []),
].join("|"), { timeout, visible: true });
exports.getInputByLabel = getInputByLabel;
const getSettingsSwitch = (page, text) => page.waitForXPath([
    `//span[contains(.,'${text}')]/parent::div/following-sibling::div/div/div/div`,
    `//span[contains(.,'${text}')]/parent::div/following-sibling::div/div/label/div`,
].join("|"), { visible: true });
exports.getSettingsSwitch = getSettingsSwitch;
const getErrorMessage = async (page) => {
    const options = {
        timeout: 1000,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const errorElement = await Promise.race([
        page.waitForSelector(`span.error`, options),
        page.waitForSelector(`.typography--color-error-1`, options),
        page.waitForSelector(`.typography--color-error-default`, options),
    ]).catch(() => null);
    if (!errorElement)
        return false;
    return page.evaluate((node) => node.textContent, errorElement.getSource());
};
exports.getErrorMessage = getErrorMessage;
const getAccountMenuButton = (page) => page.waitForXPath(`//button[contains(@title,'Account options')]`, {
    visible: true,
});
exports.getAccountMenuButton = getAccountMenuButton;
const getButton = async (page, text, options) => {
    return await Promise.race([
        (0, exports.getElementByTestId)(page, text, options),
        (0, exports.getElementByContent)(page, text, "button", options),
    ]);
};
exports.getButton = getButton;
