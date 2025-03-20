import { Context } from 'telegraf';
import { getWallets } from '../../api/wallet';

export async function depositCommand(ctx: Context) {
  try {
    const wallets = await getWallets();
    const defaultWallet = wallets.find((w) => w.isDefault);
    if (!defaultWallet) {
      await ctx.reply('No default wallet set. Use /setdefault <walletId>');
      return;
    }
    await ctx.reply(
      `To deposit USDC, send it to:\n*${defaultWallet.address}*\nNetwork: ${defaultWallet.network}`,
      { parse_mode: 'Markdown' }
    );
  } catch (error) {
    await ctx.reply('Error fetching wallet info.');
  }
}