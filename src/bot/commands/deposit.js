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
exports.depositCommand = depositCommand;
const wallet_1 = require("../../api/wallet");
function depositCommand(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wallets = yield (0, wallet_1.getWallets)();
            const defaultWallet = wallets.find((w) => w.isDefault);
            if (!defaultWallet) {
                yield ctx.reply('No default wallet set. Use /setdefault <walletId>');
                return;
            }
            yield ctx.reply(`To deposit USDC, send it to:\n*${defaultWallet.address}*\nNetwork: ${defaultWallet.network}`, { parse_mode: 'Markdown' });
        }
        catch (error) {
            yield ctx.reply('Error fetching wallet info.');
        }
    });
}
