// Cloudflare Worker: forwards a prompt to the Claude API so your key stays off the page.
// Secrets/vars to set in Cloudflare: ANTHROPIC_API_KEY (secret), ALLOWED_ORIGIN (e.g. https://you.github.io)
export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST" || origin !== env.ALLOWED_ORIGIN)
      return new Response("Forbidden", { status: 403, headers: cors });
    let prompt = "";
    try { prompt = String((await req.json()).prompt || "").slice(0, 4000); } catch (e) {}
    if (!prompt) return new Response("Bad request", { status: 400, headers: cors });
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5-5",
        max_tokens: 700,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!r.ok) return new Response("Upstream error", { status: 502, headers: cors });
    const j = await r.json();
    const text = (j.content || []).map((c) => c.text || "").join("");
    return new Response(JSON.stringify({ text }), { headers: { ...cors, "content-type": "application/json" } });
  },
};
