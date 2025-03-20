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
exports.helpCommand = helpCommand;
const telegraf_1 = require("telegraf");
function helpCommand(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const helpMessage = `
*Copperx Telegram Bot - Help*

Welcome to the Copperx Bot! Here are the available commands:

/start - Initialize the bot and show the main menu
/balance - Check your wallet balances across all networks
/send <type> <destination> <amount> - Send USDC
  - Example: /send email test@example.com 10
  - Example: /send wallet 0x123... 5
/withdraw <accountId> <amount> - Withdraw USDC to a bank account
  - Example: /withdraw bank123 50
/deposit - Get your default wallet address for deposits
/help - Show this help message
`;
        const helpKeyboard = telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback('Back to Menu', 'main')],
        ]);
        yield ctx.reply(helpMessage, {
            parse_mode: 'Markdown',
            reply_markup: helpKeyboard.reply_markup,
        });
    });
}
