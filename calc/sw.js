// cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('example-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/main.js',
        '/bundle.css',
        '/manifest.json',
      ])
    })
  )
});

// if online - use fetched resources
// otherwise, provide data from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  )
});


// @TODO: background sync could be used
// to ensure that when user clicks "Save" 
// and is offline, that those data will be saved once he/she goes back online