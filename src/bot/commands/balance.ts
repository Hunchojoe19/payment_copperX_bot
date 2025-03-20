import { Context } from 'telegraf';
import { formatBalanceMessage } from '../../utils/formatters';
import { getWalletBalances } from '../../api/wallet';

export async function balanceCommand(ctx: Context) {
  try {
    const balances = await getWalletBalances();
    const message = formatBalanceMessage(balances);
    await ctx.reply(`*Your Balances*\n\n${message}`, { parse_mode: 'Markdown' });
  } catch (error) {
    await ctx.reply('Error fetching balances. Please try again.');
  }
}