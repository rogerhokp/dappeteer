"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickOnLittleDownArrowIfNeeded = exports.waitForOverlay = exports.typeOnInputField = exports.goToHomePage = exports.clickOnLogo = exports.clickOnNavigationButton = exports.clickOnButton = exports.clickOnElement = exports.openAccountDropdown = exports.profileDropdownClick = exports.openNetworkDropdown = exports.openSettingsScreen = exports.clickOnSettingsSwitch = void 0;
const selectors_1 = require("./selectors");
const utils_1 = require("./utils");
const clickOnSettingsSwitch = async (page, text) => {
    const button = await (0, selectors_1.getSettingsSwitch)(page, text);
    await button.click();
};
exports.clickOnSettingsSwitch = clickOnSettingsSwitch;
const openSettingsScreen = async (page, section = "General") => {
    await (0, exports.profileDropdownClick)(page);
    await (0, exports.clickOnElement)(page, "Settings");
    await (0, exports.clickOnElement)(page, section);
};
exports.openSettingsScreen = openSettingsScreen;
const openNetworkDropdown = async (page) => {
    await (0, utils_1.retry)(async () => {
        const networkSwitcher = await page.waitForSelector(".network-display", {
            visible: true,
        });
        await networkSwitcher.click();
        await page.waitForSelector(".network-dropdown-list", {
            visible: true,
            timeout: 1000,
        });
    }, 3);
};
exports.openNetworkDropdown = openNetworkDropdown;
const profileDropdownClick = async (page, expectToClose = false) => {
    await (0, utils_1.retry)(async () => {
        const accountSwitcher = await page.waitForSelector(".account-menu__icon", {
            visible: true,
            timeout: 2000,
        });
        await accountSwitcher.click();
        await page.waitForSelector(".account-menu", {
            hidden: expectToClose,
            timeout: 2000,
        });
    }, 3);
};
exports.profileDropdownClick = profileDropdownClick;
const openAccountDropdown = async (page) => {
    const accMenu = await (0, selectors_1.getAccountMenuButton)(page);
    await accMenu.click();
    await page.waitForSelector(".menu__container.account-options-menu", {
        visible: true,
    });
};
exports.openAccountDropdown = openAccountDropdown;
const clickOnElement = async (page, text, type) => {
    const element = await (0, selectors_1.getElementByContent)(page, text, type);
    await element.click();
};
exports.clickOnElement = clickOnElement;
const clickOnButton = async (page, text, options) => {
    const button = await (0, selectors_1.getButton)(page, text, options);
    await button.click();
};
exports.clickOnButton = clickOnButton;
const clickOnNavigationButton = async (metaMaskPage, text) => {
    const navigationButton = await (0, selectors_1.getButton)(metaMaskPage, text);
    await Promise.all([
        metaMaskPage.waitForNavigation(),
        navigationButton.click(),
    ]);
};
exports.clickOnNavigationButton = clickOnNavigationButton;
const clickOnLogo = async (page) => {
    const header = await page.waitForSelector(".app-header__logo-container", {
        visible: true,
    });
    await header.click();
};
exports.clickOnLogo = clickOnLogo;
const goToHomePage = async (page) => {
    return await (0, exports.clickOnButton)(page, "app-header-logo");
};
exports.goToHomePage = goToHomePage;
/**
 *
 * @param page
 * @param label
 * @param text
 * @param clear
 * @param excludeSpan
 * @param optional
 * @returns true if found and updated, false otherwise
 */
const typeOnInputField = async (page, label, text, clear = false, excludeSpan = false, optional = false) => {
    let input;
    try {
        input = await (0, selectors_1.getInputByLabel)(page, label, excludeSpan, 1000);
    }
    catch (e) {
        if (optional)
            return false;
        throw e;
    }
    if (clear) {
        await input.type("");
    }
    await input.type(text);
    return true;
};
exports.typeOnInputField = typeOnInputField;
async function waitForOverlay(page) {
    await page.waitForSelectorIsGone(".loading-overlay", { timeout: 10000 });
    await page.waitForSelectorIsGone(".app-loading-spinner", { timeout: 10000 });
}
exports.waitForOverlay = waitForOverlay;
/**
 *
 * @param page
 */
const clickOnLittleDownArrowIfNeeded = async (page) => {
    // wait for the signature page and content to be loaded
    await page.waitForSelector('[data-testid="signature-cancel-button"]', {
        visible: true,
    });
    // MetaMask requires users to read all the data
    // and scroll until the bottom of the message
    // before enabling the "Sign" button
    const isSignButtonDisabled = await page.$eval('[data-testid="signature-sign-button"]', (button) => {
        return button.disabled;
    });
    if (isSignButtonDisabled) {
        const littleArrowDown = await page.waitForSelector(".signature-request-message__scroll-button", {
            visible: true,
        });
        await littleArrowDown.click();
    }
};
exports.clickOnLittleDownArrowIfNeeded = clickOnLittleDownArrowIfNeeded;
