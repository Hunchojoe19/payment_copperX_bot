import { Telegraf } from 'telegraf';
import { balanceCommand } from './commands/balance';
import { sendCommand } from './commands/send';
import { withdrawCommand } from './commands/withdraw';
import { depositCommand } from './commands/deposit';
import { helpCommand } from './commands/help';
import { mainMenu, sendOptions } from './keyboards';
import { config } from '../config';
import { errorHandler } from '../utils/errorHandlers';
import { setupPusherNotifications } from '../api/notifications';


export const bot = new Telegraf(config.telegramToken);
let userChatId: string | null = null;


bot.start(async (ctx) => {
  userChatId = ctx.chat.id.toString();
  await ctx.reply('Welcome to Copperx Bot!', mainMenu);
});
bot.command('help', helpCommand);
bot.command('balance', balanceCommand);
bot.command('send', sendCommand);
bot.command('withdraw', withdrawCommand);
bot.command('deposit', depositCommand);


bot.action('balance', balanceCommand);
bot.action('send', async (ctx) => await ctx.reply('How would you like to send funds?', sendOptions));
bot.action('withdraw', withdrawCommand);
bot.action('help', helpCommand);
bot.action('main', async (ctx) => await ctx.reply('Main menu', mainMenu));

bot.action('send_email', async (ctx) => {
  await ctx.reply('Please enter: /send email <email> <amount>');
});
bot.action('send_wallet', async (ctx) => {
  await ctx.reply('Please enter: /send wallet <address> <amount>');
});


bot.catch(errorHandler);


export async function launchBotWithPolling() {
  try {
   
    await bot.telegram.deleteWebhook();
   
    await bot.launch();
    console.log('Bot launched with polling');
    
    if (userChatId) setupPusherNotifications(bot, userChatId);

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
    
  } catch (error) {
    console.error('Failed to launch bot with polling:', error);
    process.exit(1);
  }
}

export async function launchBotWithWebhook(webhookUrl: string, port: number) {
  try {
    // Set webhook
    await bot.telegram.setWebhook(webhookUrl);
    console.log(`Webhook set to: ${webhookUrl}`);
    
    // Start webhook
    await bot.launch({
      webhook: {
        domain: webhookUrl,
        port: port
      }
    });
    console.log(`Webhook server started on port ${port}`);
    
    if (userChatId) setupPusherNotifications(bot, userChatId);
    
    // Log webhook info
    const webhookInfo = await bot.telegram.getWebhookInfo();
    console.log('Webhook info:', webhookInfo);
    
    // Enable graceful shutdown
    process.once('SIGINT', () => {
      bot.telegram.deleteWebhook();
      bot.stop('SIGINT');
    });
    
    process.once('SIGTERM', () => {
      bot.telegram.deleteWebhook();
      bot.stop('SIGTERM');
    });
    
  } catch (error) {
    console.error('Failed to launch bot with webhook:', error);
    process.exit(1);
  }
}