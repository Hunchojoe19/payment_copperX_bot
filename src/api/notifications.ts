import Pusher from 'pusher-js';
import { Telegraf } from 'telegraf';
import { config } from '../config';
import apiClient from './index';

export function setupPusherNotifications(bot: Telegraf, chatId: string) {
  const pusherClient = new Pusher(config.pusherKey || "", {
    cluster: config.pusherCluster || 'defaultCluster',
    authorizer: (channel) => ({
      authorize: async (socketId, callback) => {
        try {
          const response = await apiClient.post('/notifications/auth', {
            socket_id: socketId,
            channel_name: channel.name,
          });
          callback(null, response.data);
        } catch (error) {
          callback(new Error('Authorization failed'), null);
        }
      },
    }),
  });

  const channel = pusherClient.subscribe(`private-org-${process.env.ORGANIZATION_ID}`);
  channel.bind('deposit', (data: any) => {
    bot.telegram.sendMessage(
      chatId,
      `💰 *New Deposit Received*\n\n${data.amount} USDC deposited on ${data.network || 'Solana'}`,
      { parse_mode: 'Markdown' }
    );
  });

  channel.bind('pusher:subscription_succeeded', () => {
    console.log('Subscribed to Pusher channel');
  });
}