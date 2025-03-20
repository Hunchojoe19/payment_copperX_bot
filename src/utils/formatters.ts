import { WalletBalance } from '../types/api';

export function formatBalanceMessage(balances: WalletBalance[]): string {
  return balances.length > 0
    ? balances.map((b) => `${b.network}: ${b.amount} USDC`).join('\n')
    : 'No balances available.';
}