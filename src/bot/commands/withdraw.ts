import { Context } from 'telegraf';
import { withdrawToBank } from '../../api/transfer';

export async function withdrawCommand(ctx: Context) {
  const message = ctx.message as import('telegraf/typings/core/types/typegram').Message.TextMessage;
  const args = (message?.text || '').split(' ').slice(1);
  if (args.length < 2) {
    await ctx.reply('Usage: /withdraw <accountId> <amount>');
    return;
  }

  const [accountId, amountStr] = args;
  const amount = parseFloat(amountStr);

  try {
    const result = await withdrawToBank(accountId, amount);
    await ctx.reply(`Withdrawn ${amount} USDC to bank\nTransaction ID: ${result.id}`);
  } catch (error) {
    await ctx.reply('Error processing withdrawal. Please ensure minimum amount is met.');
  }
}