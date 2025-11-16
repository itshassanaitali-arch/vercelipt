// Vercel Serverless Function (Node.js)
// Put this file at /api/proxy.js
// Usage: https://<your-vercel-project>.vercel.app/api/proxy?url=<encoded_m3u8_url>
export default async function handler(req, res) {
  try {
    const target = req.query.url;
    if (!target) return res.status(400).send("Missing ?url=");

    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Connection": "keep-alive"
      }
    });

    // Forward status
    res.status(response.status);

    // Forward most headers (except hop-by-hop / encoding that might break)
    response.headers.forEach((value, name) => {
      const lower = name.toLowerCase();
      if (["content-encoding","transfer-encoding","connection"].includes(lower)) return;
      res.setHeader(name, value);
    });

    // Allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");

    // Stream body by reading as ArrayBuffer then send (works reliably on Vercel)
    const ab = await response.arrayBuffer();
    const buf = Buffer.from(ab);
    res.send(buf);
  } catch (err) {
    console.error(err);
    res.status(502).send("Bad Gateway: " + String(err.message || err));
  }
}
