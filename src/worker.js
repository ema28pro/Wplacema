/**
 * BlueMap Cloudflare Worker
 * Fetches gzip-compressed BlueMap assets (.gz files), decompresses them
 * in the Worker, and serves plain content — avoiding double-gzip issues.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Try the requested file as-is first
    const response = await env.ASSETS.fetch(request);
    if (response.ok) return response;

    // Not found — try the .gz version
    // Use a clean request (no If-None-Match / If-Modified-Since) to avoid
    // Cloudflare returning 304 Not Modified which we can't decompress.
    const gzResponse = await env.ASSETS.fetch(
      new Request(url.origin + path + ".gz", { method: "GET" })
    );

    if (!gzResponse.ok) return response; // nothing found, return 404

    // Decompress gzip in the Worker using the Web Streams API
    const decompressed = gzResponse.body.pipeThrough(
      new DecompressionStream("gzip")
    );

    return new Response(decompressed, {
      status: 200,
      headers: {
        "Content-Type": getContentType(path),
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
};

function getContentType(path) {
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".prbm")) return "application/octet-stream";
  if (path.endsWith(".png"))  return "image/png";
  if (path.endsWith(".js"))   return "application/javascript";
  if (path.endsWith(".css"))  return "text/css";
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  return "application/octet-stream";
}
