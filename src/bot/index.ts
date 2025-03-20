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


// Create bot instance
export const bot = new Telegraf(config.telegramToken);
let userChatId: string | null = null;

// Basic commands
bot.start(async (ctx) => {
  userChatId = ctx.chat.id.toString();
  await ctx.reply('Welcome to Copperx Bot!', mainMenu);
});
bot.command('help', helpCommand);
bot.command('balance', balanceCommand);
bot.command('send', sendCommand);
bot.command('withdraw', withdrawCommand);
bot.command('deposit', depositCommand);

// Inline keyboard actions
bot.action('balance', balanceCommand);
bot.action('send', async (ctx) => await ctx.reply('How would you like to send funds?', sendOptions));
bot.action('withdraw', withdrawCommand);
bot.action('help', helpCommand);
bot.action('main', async (ctx) => await ctx.reply('Main menu', mainMenu));

// Send options
bot.action('send_email', async (ctx) => {
  await ctx.reply('Please enter: /send email <email> <amount>');
});
bot.action('send_wallet', async (ctx) => {
  await ctx.reply('Please enter: /send wallet <address> <amount>');
});

// Error handling
bot.catch(errorHandler);

// For local development with polling
export async function launchBotWithPolling() {
  try {
    // Remove any existing webhook
    await bot.telegram.deleteWebhook();
    
    // Launch with polling
    await bot.launch();
    console.log('Bot launched with polling');
    
    if (userChatId) setupPusherNotifications(bot, userChatId);
    
    // Enable graceful shutdown
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
    
  } catch (error) {
    console.error('Failed to launch bot with polling:', error);
    process.exit(1);
  }
}

// For production with webhook
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