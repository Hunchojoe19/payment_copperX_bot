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
exports.withdrawCommand = withdrawCommand;
const transfer_1 = require("../../api/transfer");
function withdrawCommand(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = ctx.message;
        const args = ((message === null || message === void 0 ? void 0 : message.text) || '').split(' ').slice(1);
        if (args.length < 2) {
            yield ctx.reply('Usage: /withdraw <accountId> <amount>');
            return;
        }
        const [accountId, amountStr] = args;
        const amount = parseFloat(amountStr);
        try {
            const result = yield (0, transfer_1.withdrawToBank)(accountId, amount);
            yield ctx.reply(`Withdrawn ${amount} USDC to bank\nTransaction ID: ${result.id}`);
        }
        catch (error) {
            yield ctx.reply('Error processing withdrawal. Please ensure minimum amount is met.');
        }
    });
}
