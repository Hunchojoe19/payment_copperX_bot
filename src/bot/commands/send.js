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
exports.sendCommand = sendCommand;
const transfer_1 = require("../../api/transfer");
function sendCommand(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // Type guard to ensure ctx.message is a TextMessage
        const message = ctx.message;
        if (!message || !('text' in message)) {
            yield ctx.reply('Please send a text command. Usage: /send <email|wallet> <destination> <amount>');
            return;
        }
        // Now message is guaranteed to be TextMessage with a text property
        const args = message.text.split(' ').slice(1);
        if (args.length < 3) {
            yield ctx.reply('Usage: /send <email|wallet> <destination> <amount>');
            return;
        }
        const [type, destination, amountStr] = args;
        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount <= 0) {
            yield ctx.reply('Please provide a valid positive amount.');
            return;
        }
        try {
            if (type === 'email') {
                const result = yield (0, transfer_1.sendToEmail)(destination, amount);
                yield ctx.reply(`Sent ${amount} USDC to ${destination}\nTransaction ID: ${result.id}`);
            }
            else if (type === 'wallet') {
                const result = yield (0, transfer_1.withdrawToWallet)(destination, amount);
                yield ctx.reply(`Sent ${amount} USDC to ${destination}\nTransaction ID: ${result.id}`);
            }
            else {
                yield ctx.reply('Invalid type. Use "email" or "wallet".');
            }
        }
        catch (error) {
            yield ctx.reply('Error processing transfer. Please try again.');
        }
    });
}
