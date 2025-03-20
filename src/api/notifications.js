"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPusherNotifications = setupPusherNotifications;
const pusher_js_1 = __importDefault(require("pusher-js"));
const config_1 = require("../config");
const index_1 = __importDefault(require("./index"));
function setupPusherNotifications(bot, chatId) {
    const pusherClient = new pusher_js_1.default(config_1.config.pusherKey || "", {
        cluster: config_1.config.pusherCluster || 'defaultCluster',
        authorizer: (channel) => ({
            authorize: (socketId, callback) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield index_1.default.post('/notifications/auth', {
                        socket_id: socketId,
                        channel_name: channel.name,
                    });
                    callback(null, response.data);
                }
                catch (error) {
                    callback(new Error('Authorization failed'), null);
                }
            }),
        }),
    });
    const channel = pusherClient.subscribe(`private-org-${process.env.ORGANIZATION_ID}`);
    channel.bind('deposit', (data) => {
        bot.telegram.sendMessage(chatId, `💰 *New Deposit Received*\n\n${data.amount} USDC deposited on ${data.network || 'Solana'}`, { parse_mode: 'Markdown' });
    });
    channel.bind('pusher:subscription_succeeded', () => {
        console.log('Subscribed to Pusher channel');
    });
}
