const CACHE_NAME = "2025-06-22 03:20";
const urlsToCache = [
  "/siminym-ja/",
  "/siminym-ja/index.js",
  "/siminym-ja/sql.js-httpvfs/sql-wasm.wasm",
  "/siminym-ja/sql.js-httpvfs/sqlite.worker.js",
  "/siminym-ja/favicon/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
});
