import { Context } from 'telegraf';
import { config } from '../../config';
import { Markup } from 'telegraf';

export async function helpCommand(ctx: Context) {
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

  const helpKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Back to Menu', 'main')],
  ]);

  await ctx.reply(helpMessage, {
    parse_mode: 'Markdown',
    reply_markup: helpKeyboard.reply_markup,
  });
}