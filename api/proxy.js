export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "",
        "Origin": ""
      }
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Could not fetch stream" });
    }

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    const stream = await response.text();

    res.send(stream);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
