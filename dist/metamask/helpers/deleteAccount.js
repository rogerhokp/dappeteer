"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = void 0;
const helpers_1 = require("../../helpers");
const switchAccount_1 = require("../switchAccount");
const deleteAccount = (page) => async (accountNumber) => {
    await page.bringToFront();
    if (accountNumber === 1)
        throw new SyntaxError("Account 1 cannot be deleted");
    await (0, switchAccount_1.switchAccount)(page)(accountNumber);
    await (0, helpers_1.openAccountDropdown)(page);
    await (0, helpers_1.clickOnElement)(page, "Remove account");
    await (0, helpers_1.clickOnButton)(page, "Remove");
    await page.reload();
};
exports.deleteAccount = deleteAccount;
