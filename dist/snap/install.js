"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSnapInstalled = exports.installSnap = void 0;
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const install_utils_1 = require("./install-utils");
const utils_1 = require("./utils");
const installSnap = (flaskPage) => async (snapIdOrLocation, opts) => {
    (0, utils_1.flaskOnly)(flaskPage);
    //need to open page to access window.ethereum
    const installPage = await flaskPage.browser().newPage();
    await installPage.goto(opts?.installationSnapUrl ?? constants_1.EXAMPLE_WEBSITE);
    let snapServer;
    if (fs_1.default.existsSync(snapIdOrLocation)) {
        //snap dist location
        snapServer = await (0, install_utils_1.startSnapServer)(snapIdOrLocation);
        snapIdOrLocation = `local:${(0, install_utils_1.toUrl)(snapServer.address())}`;
    }
    const installAction = installPage.evaluate(({ snapId, version }) => window.ethereum.request({
        method: "wallet_requestSnaps",
        params: {
            [snapId]: {
                version: version ?? "latest",
            },
        },
    }), { snapId: snapIdOrLocation, version: opts?.version });
    await flaskPage.bringToFront();
    await flaskPage.reload();
    await (0, helpers_1.clickOnButton)(flaskPage, "Connect");
    const isAskingForPermissions = await (0, utils_1.isFirstElementAppearsFirst)({
        selectorOrXpath1: `//*[contains(text(), 'Approve & install')]`,
        selectorOrXpath2: `//*[contains(text(), 'Install')]`,
        page: flaskPage,
    });
    if (isAskingForPermissions) {
        await (0, helpers_1.clickOnButton)(flaskPage, "page-container-footer-next", {
            visible: false,
        });
        const isShowingWarning = await (0, utils_1.isFirstElementAppearsFirst)({
            selectorOrXpath1: ".popover-wrap.snap-install-warning",
            selectorOrXpath2: ".app-header__metafox-logo--icon",
            page: flaskPage,
        });
        if (isShowingWarning) {
            await flaskPage.waitForSelector(".checkbox-label", {
                visible: false,
            });
            for await (const checkbox of await flaskPage.$$(".checkbox-label")) {
                await checkbox.click();
            }
            await (0, helpers_1.clickOnButton)(flaskPage, "Confirm");
        }
    }
    else {
        await (0, helpers_1.clickOnButton)(flaskPage, "Install");
    }
    for (const step of opts?.customSteps ?? []) {
        await step(flaskPage);
    }
    const result = await installAction;
    await installPage.waitForTimeout(1000);
    await installPage.close({ runBeforeUnload: true });
    if (!(snapIdOrLocation in result)) {
        throw new Error("Failed to install snap");
    }
    snapServer.close();
    return snapIdOrLocation;
};
exports.installSnap = installSnap;
async function isSnapInstalled(flaskPage, snapId) {
    await flaskPage.bringToFront();
    await (0, helpers_1.profileDropdownClick)(flaskPage);
    await (0, helpers_1.clickOnElement)(flaskPage, "Settings");
    await (0, helpers_1.clickOnElement)(flaskPage, "Snaps");
    let found = false;
    try {
        await flaskPage.waitForXPath(`//*[contains(text(), '${snapId}')]`, {
            timeout: 5000,
        });
        found = true;
    }
    catch (e) {
        found = false;
    }
    await (0, helpers_1.clickOnLogo)(flaskPage);
    return found;
}
exports.isSnapInstalled = isSnapInstalled;
