interface Env {
  ALLOWED_ORIGIN: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

const json = (body: object, status: number, origin: string) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": origin,
      Vary: "Origin",
      "Cache-Control": "no-store",
    },
  });

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const requestOrigin = request.headers.get("Origin") ?? "";
    const allowedOrigin = env.ALLOWED_ORIGIN.replace(/\/$/, "");

    if (requestOrigin !== allowedOrigin) {
      return json({ ok: false, error: "Origin not allowed" }, 403, allowedOrigin);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
          Vary: "Origin",
        },
      });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "Method not allowed" }, 405, allowedOrigin);
    }

    const contentType = request.headers.get("Content-Type") ?? "";
    if (!contentType.toLowerCase().startsWith("application/json")) {
      return json({ ok: false, error: "JSON required" }, 415, allowedOrigin);
    }
    if (Number(request.headers.get("Content-Length") ?? 0) > 8192) {
      return json({ ok: false, error: "Message too large" }, 413, allowedOrigin);
    }

    let payload: ContactPayload;
    try {
      payload = (await request.json()) as ContactPayload;
    } catch {
      return json({ ok: false, error: "Invalid JSON" }, 400, allowedOrigin);
    }

    // Bots commonly fill hidden fields; accept the request without notifying Fira.
    if (clean(payload.company, 100)) return json({ ok: true }, 200, allowedOrigin);

    const name = clean(payload.name, 100);
    const email = clean(payload.email, 254);
    const message = clean(payload.message, 3000);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !emailPattern.test(email) || !message) {
      return json(
        { ok: false, error: "Name, valid email and message are required" },
        400,
        allowedOrigin,
      );
    }

    const text = [
      "New portfolio enquiry",
      "",
      `Name: ${name}`,
      `Reply to: ${email}`,
      "",
      message,
    ].join("\n");

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return json({ ok: false, error: "Delivery unavailable" }, 503, allowedOrigin);
    }

    let telegramResponse: Response;
    try {
      telegramResponse = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
            disable_web_page_preview: true,
          }),
        },
      );
    } catch {
      return json({ ok: false, error: "Delivery failed" }, 502, allowedOrigin);
    }

    if (!telegramResponse.ok) {
      console.error("Telegram delivery failed", telegramResponse.status);
      return json({ ok: false, error: "Delivery failed" }, 502, allowedOrigin);
    }

    return json({ ok: true }, 200, allowedOrigin);
  },
};
