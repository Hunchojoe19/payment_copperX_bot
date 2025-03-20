"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    telegramToken: process.env.TELEGRAM_BOT_TOKEN || '',
    copperxApiBaseUrl: process.env.COPPERX_API_BASE_URL,
    pusherKey: process.env.VITE_PUSHER_KEY,
    pusherCluster: process.env.VITE_PUSHER_CLUSTER,
};
