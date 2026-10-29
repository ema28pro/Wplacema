/**
 * BlueMap Cloudflare Worker
 * Serves gzip-compressed BlueMap assets (.gz files) with proper Content-Encoding headers
 * so the browser decompresses them transparently.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Try to serve the requested file first (as-is)
    let response = await env.ASSETS.fetch(request);

    // If found, return it directly
    if (response.ok) {
      return response;
    }

    // If 404, check if a .gz version exists
    const gzRequest = new Request(url.origin + path + ".gz", request);
    const gzResponse = await env.ASSETS.fetch(gzRequest);

    if (gzResponse.ok) {
      // Determine Content-Type based on the original extension
      const contentType = getContentType(path);

      // Build new response with proper headers for gzip content
      const headers = new Headers(gzResponse.headers);
      headers.set("Content-Encoding", "gzip");
      headers.set("Content-Type", contentType);
      // Remove content-length since it refers to compressed size
      headers.delete("Content-Length");

      return new Response(gzResponse.body, {
        status: gzResponse.status,
        headers,
      });
    }

    // Nothing found, return original 404
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

