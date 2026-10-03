export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    if (host !== "optlyouts.com" && host !== "www.optlyouts.com") {
      return new Response("not this host", { status: 404 });
    }
    if (url.pathname !== "/" && url.pathname !== "/index.html" && url.pathname !== "/robots.txt") {
      url.pathname = "/index.html";
    }
    if (url.pathname === "/") url.pathname = "/index.html";
    const asset = await env.ASSETS.fetch(new Request(url.toString(), request));
    const headers = new Headers(asset.headers);
    headers.set("Cache-Control", "public, max-age=60");
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(asset.body, { status: asset.status, headers });
  },
};
