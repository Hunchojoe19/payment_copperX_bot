"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOptions = exports.mainMenu = void 0;
const telegraf_1 = require("telegraf");
exports.mainMenu = telegraf_1.Markup.inlineKeyboard([
    [telegraf_1.Markup.button.callback('Check Balance', 'balance')],
    [telegraf_1.Markup.button.callback('Send Funds', 'send'), telegraf_1.Markup.button.callback('Withdraw', 'withdraw')],
    [telegraf_1.Markup.button.callback('Help', 'help')],
]);
exports.sendOptions = telegraf_1.Markup.inlineKeyboard([
    [telegraf_1.Markup.button.callback('To Email', 'send_email')],
    [telegraf_1.Markup.button.callback('To Wallet', 'send_wallet')],
    [telegraf_1.Markup.button.callback('Back', 'main')],
]);
