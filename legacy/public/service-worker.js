const CACHE_VERSION = "mattdbaldwin-static-v1";
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const IMMUTABLE_PATTERN = /\/(?:assets|images|fonts)\/|\.(?:webp|png|jpg|jpeg|svg|gif|woff2?)$/i;

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

const cacheFirst = async (request) => {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response && response.ok) {
    cache.put(request, response.clone());
  }
  return response;
};

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cachedResponse);

  return cachedResponse || networkFetch;
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (IMMUTABLE_PATTERN.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.destination === "script" || request.destination === "style") {
    event.respondWith(staleWhileRevalidate(request));
  }
});
