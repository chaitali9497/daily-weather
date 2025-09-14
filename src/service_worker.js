// Name of the cache
const CACHE_NAME = "weather-cache-v1";

// Files to cache
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "src/input.css",
  "src/index.js",
  "src/icons/weather_logo.png",
  "src/icons/weather_logo.png"
];

// Install event → cache files
self.addEventListener("install", event => {
  console.log("ServiceWorker: Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate event → cleanup old caches
self.addEventListener("activate", event => {
  console.log("ServiceWorker: Activated");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch event → serve cached files if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // If request not in cache and offline
        return caches.match("/index.html");
      });
    })
  );
});






