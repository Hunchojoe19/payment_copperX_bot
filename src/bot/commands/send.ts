import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { sendToEmail, withdrawToWallet } from '../../api/transfer';

export async function sendCommand(ctx: Context) {
  // Type guard to ensure ctx.message is a TextMessage
  const message = ctx.message as Message.TextMessage | undefined;
  if (!message || !('text' in message)) {
    await ctx.reply('Please send a text command. Usage: /send <email|wallet> <destination> <amount>');
    return;
  }

  // Now message is guaranteed to be TextMessage with a text property
  const args = message.text.split(' ').slice(1);

  if (args.length < 3) {
    await ctx.reply('Usage: /send <email|wallet> <destination> <amount>');
    return;
  }

  const [type, destination, amountStr] = args;
  const amount = parseFloat(amountStr);

  if (isNaN(amount) || amount <= 0) {
    await ctx.reply('Please provide a valid positive amount.');
    return;
  }

  try {
    if (type === 'email') {
      const result = await sendToEmail(destination, amount);
      await ctx.reply(`Sent ${amount} USDC to ${destination}\nTransaction ID: ${result.id}`);
    } else if (type === 'wallet') {
      const result = await withdrawToWallet(destination, amount);
      await ctx.reply(`Sent ${amount} USDC to ${destination}\nTransaction ID: ${result.id}`);
    } else {
      await ctx.reply('Invalid type. Use "email" or "wallet".');
    }
  } catch (error) {
    await ctx.reply('Error processing transfer. Please try again.');
  }
}