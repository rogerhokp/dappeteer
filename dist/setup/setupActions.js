"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeNewModal = exports.closeWhatsNewModal = exports.closePortfolioTooltip = exports.closePopup = exports.importAccount = exports.declineAnalytics = exports.confirmWelcomeScreen = exports.acceptTheRisks = exports.enableEthSign = exports.showTestNets = void 0;
const helpers_1 = require("../helpers");
async function showTestNets(metaMaskPage) {
    await (0, helpers_1.openNetworkDropdown)(metaMaskPage);
    await (0, helpers_1.clickOnElement)(metaMaskPage, "Show/hide");
    await (0, helpers_1.clickOnSettingsSwitch)(metaMaskPage, "Show test networks");
    await (0, helpers_1.clickOnLogo)(metaMaskPage);
}
exports.showTestNets = showTestNets;
async function enableEthSign(metaMaskPage) {
    await (0, helpers_1.openSettingsScreen)(metaMaskPage, "Advanced");
    await (0, helpers_1.clickOnSettingsSwitch)(metaMaskPage, "Toggle eth_sign requests");
    await (0, helpers_1.clickOnLogo)(metaMaskPage);
}
exports.enableEthSign = enableEthSign;
async function acceptTheRisks(metaMaskPage) {
    await (0, helpers_1.clickOnButton)(metaMaskPage, "I accept the risks");
}
exports.acceptTheRisks = acceptTheRisks;
async function confirmWelcomeScreen(metaMaskPage) {
    await (0, helpers_1.clickOnButton)(metaMaskPage, "Get started");
}
exports.confirmWelcomeScreen = confirmWelcomeScreen;
async function declineAnalytics(metaMaskPage) {
    await (0, helpers_1.clickOnButton)(metaMaskPage, "No thanks");
}
exports.declineAnalytics = declineAnalytics;
async function importAccount(metaMaskPage, { seed = "already turtle birth enroll since owner keep patch skirt drift any dinner", password = "password1234", }) {
    await (0, helpers_1.clickOnButton)(metaMaskPage, "onboarding-import-wallet");
    await (0, helpers_1.clickOnButton)(metaMaskPage, "metametrics-i-agree");
    for (const [index, seedPart] of seed.split(" ").entries())
        await (0, helpers_1.typeOnInputField)(metaMaskPage, `${index + 1}.`, seedPart);
    await (0, helpers_1.clickOnButton)(metaMaskPage, "Confirm Secret");
    await (0, helpers_1.typeOnInputField)(metaMaskPage, "New password", password);
    await (0, helpers_1.typeOnInputField)(metaMaskPage, "Confirm password", password);
    // onboarding/create-password URL
    await (0, helpers_1.clickOnButton)(metaMaskPage, "create-password-terms");
    await (0, helpers_1.clickOnNavigationButton)(metaMaskPage, "create-password-import");
    await (0, helpers_1.waitForOverlay)(metaMaskPage);
    // onboarding/completion URL
    await (0, helpers_1.clickOnNavigationButton)(metaMaskPage, "onboarding-complete-done");
    // onboarding/pin-extension tab 1 URL
    await (0, helpers_1.clickOnButton)(metaMaskPage, "pin-extension-next");
    // onboarding/pin-extension tab 2 URL
    await (0, helpers_1.clickOnNavigationButton)(metaMaskPage, "pin-extension-done");
}
exports.importAccount = importAccount;
const closePopup = async (page) => {
    /* For some reason popup deletes close button and then create new one (react stuff)
     * hacky solution can be found here => https://github.com/puppeteer/puppeteer/issues/3496 */
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.$eval(".popover-header__button", (node) => node.click());
};
exports.closePopup = closePopup;
const closePortfolioTooltip = async (page) => {
    const closeButton = await page.waitForSelector(`div.home__subheader-link--tooltip-content-header > button`, {
        timeout: 20000,
    });
    await closeButton.click();
    await page.waitForTimeout(333);
};
exports.closePortfolioTooltip = closePortfolioTooltip;
const closeWhatsNewModal = async (page) => {
    await page.reload();
    await (0, helpers_1.clickOnLogo)(page);
    await page.waitForTimeout(333);
};
exports.closeWhatsNewModal = closeWhatsNewModal;
const closeNewModal = async (page) => {
    const closeButton = await page.$(".home__subheader-link--tooltip-content-header-button");
    await closeButton.click();
};
exports.closeNewModal = closeNewModal;
