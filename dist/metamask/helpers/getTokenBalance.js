"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenBalance = void 0;
const helpers_1 = require("../../helpers");
const getTokenBalance = (page) => async (tokenSymbol) => {
    await page.bringToFront();
    await (0, helpers_1.clickOnButton)(page, "Assets");
    await page.waitForSelector(".asset-list-item__token-button");
    const assetListItems = await page.$$(".asset-list-item__token-button");
    for (let index = 0; index < assetListItems.length; index++) {
        const assetListItem = assetListItems[index];
        const titleAttributeValue = await page.evaluate((item) => item.getAttribute("title"), assetListItem.getSource());
        if (titleAttributeValue.split(" ")[1].toUpperCase() ===
            tokenSymbol.toUpperCase()) {
            const balance = titleAttributeValue.split(" ")[0];
            return parseFloat(balance);
        }
    }
    return 0;
};
exports.getTokenBalance = getTokenBalance;
