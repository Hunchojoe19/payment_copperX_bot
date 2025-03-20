// // For Vercel, create an API route
// // api/webhook.ts
// import { createServer } from 'http';
// import { bot } from '../bot';

// // Export the request handler for Vercel
// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       await bot.handleUpdate(req.body);
//       res.status(200).send('OK');
//     } catch (error) {
//       console.error('Error handling update:', error);
//       res.status(500).send('Error handling update');
//     }
//   } else {
//     res.status(200).send('Webhook is working');
//   }
// }