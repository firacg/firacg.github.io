# Telegram contact Worker

This Cloudflare Worker receives the portfolio contact form and forwards it to a
private Telegram chat. The bot token and chat ID stay server-side and are never
included in the GitHub Pages bundle.

## One-time setup

1. Create a bot with `@BotFather` and send the new bot any message.
2. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy the numeric
   `message.chat.id` value.
3. In this directory, authenticate Wrangler and add both secrets:

   ```bash
   npx wrangler login
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   npx wrangler deploy
   ```

4. Copy the deployed `workers.dev` URL into the GitHub repository variable
   `CONTACT_API_URL`. The Pages workflow exposes that non-secret URL as
   `VITE_CONTACT_API_URL` during the static build.

For local site development, copy `.env.example` to `.env.local` and replace the
placeholder with the deployed Worker URL. Never put the bot token or chat ID in
a `VITE_*` variable.
