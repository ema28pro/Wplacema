/**
 * BlueMap Cloudflare Worker
 * Serves gzip-compressed BlueMap assets (.gz files) with proper Content-Encoding headers
 * so the browser decompresses them transparently.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    console.log(`[Worker] Request: ${path}`);

    // Try to serve the requested file first (as-is)
    let response = await env.ASSETS.fetch(request);

    // If found, return it directly
    if (response.ok) {
      console.log(`[Worker] Served directly: ${path} (${response.status})`);
      return response;
    }

    console.log(`[Worker] Not found (${response.status}), trying .gz: ${path}.gz`);

    // If 404, check if a .gz version exists
    const gzRequest = new Request(url.origin + path + ".gz", request);
    const gzResponse = await env.ASSETS.fetch(gzRequest);

    if (gzResponse.ok) {
      const contentType = getContentType(path);
      console.log(`[Worker] Serving .gz as ${contentType} with Content-Encoding: gzip → ${path}`);

      const headers = new Headers(gzResponse.headers);
      headers.set("Content-Encoding", "gzip");
      headers.set("Content-Type", contentType);
      headers.delete("Content-Length");

      return new Response(gzResponse.body, {
        status: gzResponse.status,
        headers,
      });
    }

    console.log(`[Worker] 404 final: ${path}`);
    return response;
  },
};

function getContentType(path) {
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".prbm")) return "application/octet-stream";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  return "application/octet-stream";
}

