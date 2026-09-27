const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type, x-play-courier-key",
} as const;

export function jsonResponse(body: unknown, status = 200, space: number | undefined = 2): Response {
  return new Response(JSON.stringify(body, null, space), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...CORS,
    },
  });
}

export function textResponse(body: string, contentType: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": contentType,
      "cache-control": "no-store",
      ...CORS,
    },
  });
}

export function corsPreflight(): Response {
  return new Response(null, { status: 204, headers: { ...CORS, "cache-control": "no-store" } });
}
