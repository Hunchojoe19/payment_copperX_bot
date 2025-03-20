"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBalanceMessage = formatBalanceMessage;
function formatBalanceMessage(balances) {
    return balances.length > 0
        ? balances.map((b) => `${b.network}: ${b.amount} USDC`).join('\n')
        : 'No balances available.';
}
