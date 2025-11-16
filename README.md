Vercel M3U8 Proxy
================

Files:
- /api/proxy.js  -> Vercel serverless function that proxies a target URL and sets CORS headers.
- example_player.html -> Example HTML player using hls.js that points to your deployed proxy.

Deployment (quick):
1. Install Vercel CLI (optional) or use the web dashboard.
   - CLI: `npm i -g vercel`
2. From this project folder run: `vercel` and follow prompts (use default settings).
3. After deploy you'll get a URL like: https://your-project.vercel.app
4. Use the proxy URL like:
   https://your-project.vercel.app/api/proxy?url=<ENCODED_M3U8_URL>

Example:
  https://your-project.vercel.app/api/proxy?url=https://nova4k.xyz/live/34409819387648/19127759732731/1470064.m3u8

Notes:
- If the origin blocks many cloud provider IP ranges you may still need to switch providers,
  but Vercel usually works for many IPTV sources.
- This code reads the response fully before sending; it's reliable across Vercel serverless.
- For heavy traffic/low-latency streaming consider Fly.io or a dedicated VPS with Nginx.
