import { Context } from 'telegraf';
import { logger } from './logger';

// Define a custom error type for better type safety
interface BotError extends Error {
  code?: number;
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Error handler function compatible with Telegraf's bot.catch
export async function errorHandler(err: unknown, ctx: Context): Promise<void> {
  // Safely cast or handle the error as BotError
  const error = err as BotError;

  // Log the error for debugging
  logger.error('Bot error occurred:', {
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
    } else if (error.code === 401) {
      userMessage = 'Authentication failed. Please re-authenticate or contact support.';
    } else if (error.response?.data?.message) {
      userMessage = `Error: ${error.response.data.message}`;
    }
  }

  // Send feedback to the user
  try {
    await ctx.reply(userMessage);
  } catch (replyError) {
    logger.error('Failed to send error message to user:', replyError);
  }
}