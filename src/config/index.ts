import dotenv from 'dotenv';

dotenv.config();

export const config = {
  telegramToken: process.env.TELEGRAM_BOT_TOKEN || '',
  copperxApiBaseUrl: process.env.COPPERX_API_BASE_URL,
  pusherKey: process.env.VITE_PUSHER_KEY,
  pusherCluster: process.env.VITE_PUSHER_CLUSTER,
  webhookDomain: process.env.WEBHOOK_DOMAIN
};