// In your Service Worker script (service-worker.js)

// Listen for the install event and cache the application's assets
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        return cache.addAll([
          '/css/style.css',
          '/js/app.js',
          '/index.html'
        ]);
      })
    );
  });
  
  // Listen for the fetch event and return the cached asset, if available
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  