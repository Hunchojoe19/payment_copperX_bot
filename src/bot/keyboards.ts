import { Markup } from 'telegraf';

export const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('Check Balance', 'balance')],
  [Markup.button.callback('Send Funds', 'send'), Markup.button.callback('Withdraw', 'withdraw')],
  [Markup.button.callback('Help', 'help')],
]);

export const sendOptions = Markup.inlineKeyboard([
  [Markup.button.callback('To Email', 'send_email')],
  [Markup.button.callback('To Wallet', 'send_wallet')],
  [Markup.button.callback('Back', 'main')],
]);