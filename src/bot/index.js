"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchBot = launchBot;
const telegraf_1 = require("telegraf");
const config_1 = require("../config");
const balance_1 = require("./commands/balance");
const send_1 = require("./commands/send");
const withdraw_1 = require("./commands/withdraw");
const deposit_1 = require("./commands/deposit");
const notifications_1 = require("../api/notifications");
const help_1 = require("./commands/help");
const keyboards_1 = require("./keyboards");
const errorHandlers_1 = require("../utils/errorHandlers");
const express = require('express');
const app = express();
const bot = new telegraf_1.Telegraf(config_1.config.telegramToken);
let userChatId = null;
const PORT = process.env.PORT;
// Basic commands
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    userChatId = ctx.chat.id.toString();
    yield ctx.reply('Welcome to Copperx Bot!', keyboards_1.mainMenu);
}));
bot.command('help', help_1.helpCommand);
bot.command('balance', balance_1.balanceCommand);
bot.command('send', send_1.sendCommand);
bot.command('withdraw', withdraw_1.withdrawCommand);
bot.command('deposit', deposit_1.depositCommand);
// Inline keyboard actions
bot.action('balance', balance_1.balanceCommand);
bot.action('send', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return yield ctx.reply('How would you like to send funds?', keyboards_1.sendOptions); }));
bot.action('withdraw', withdraw_1.withdrawCommand);
bot.action('help', help_1.helpCommand);
bot.action('main', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return yield ctx.reply('Main menu', keyboards_1.mainMenu); }));
// Send options
bot.action('send_email', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply('Please enter: /send email <email> <amount>');
}));
bot.action('send_wallet', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply('Please enter: /send wallet <address> <amount>');
}));
// Error handling
bot.catch(errorHandlers_1.errorHandler);
// Setup notifications
bot.launch().then(() => {
    if (userChatId)
        (0, notifications_1.setupPusherNotifications)(bot, userChatId);
    console.log('Bot launched successfully');
});
function launchBot() {
    bot.launch();
}
