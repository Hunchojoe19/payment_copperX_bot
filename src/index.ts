import { launchBotWithPolling, launchBotWithWebhook } from './bot';
import { config } from './config';

// Check environment to determine launch method
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function start() {
  try {
    if (isProduction && config.webhookDomain) {
      // Use webhooks in production
      const webhookUrl = `${config.webhookDomain}/bot${config.telegramToken}`;
      await launchBotWithWebhook(webhookUrl, PORT);
    } else {
      // Use polling in development
      await launchBotWithPolling();
    }
  } catch (error) {
    console.error('Failed to start bot:', error);
    process.exit(1);
  }
}

// Start the bot
start();