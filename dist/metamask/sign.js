"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = void 0;
const helpers_1 = require("../helpers");
const sign = (page, getSingedIn) => async () => {
    await page.bringToFront();
    if (!(await getSingedIn())) {
        throw new Error("You haven't signed in yet");
    }
    //retry till we get prompt
    await (0, helpers_1.retry)(async () => {
        await page.bringToFront();
        await page.reload();
        await (0, helpers_1.waitForOverlay)(page);
        await (0, helpers_1.getElementByContent)(page, "Sign", "button", { timeout: 200 });
    }, 5);
    await (0, helpers_1.clickOnButton)(page, "Sign");
    try {
        await page.waitForSelector(".signature-request-warning__content", {
            timeout: 2000,
        });
        await (0, helpers_1.clickOnButton)(page, "Sign");
    }
    catch (e) {
        //exception is thrown if the element is not found
    }
    // wait for MM to be back in a stable state
    await page.waitForSelector(".app-header", {
        visible: true,
    });
};
exports.sign = sign;
