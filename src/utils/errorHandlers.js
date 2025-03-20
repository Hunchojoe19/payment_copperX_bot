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
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = require("./logger");
// Error handler function compatible with Telegraf's bot.catch
function errorHandler(err, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        // Safely cast or handle the error as BotError
        const error = err;
        // Log the error for debugging
        logger_1.logger.error('Bot error occurred:', {
            message: error.message || 'Unknown error',
            stack: error.stack || 'No stack trace available',
            code: error.code,
        });
        // Default user-friendly message
        let userMessage = 'Oops! Something went wrong. Please try again later.';
        // Handle specific error cases
        if (error instanceof Error) {
            if (error.code === 429) {
                userMessage = 'Too many requests. Please wait a moment and try again.';
            }
            else if (error.code === 401) {
                userMessage = 'Authentication failed. Please re-authenticate or contact support.';
            }
            else if ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
                userMessage = `Error: ${error.response.data.message}`;
            }
        }
        // Send feedback to the user
        try {
            yield ctx.reply(userMessage);
        }
        catch (replyError) {
            logger_1.logger.error('Failed to send error message to user:', replyError);
        }
    });
}
