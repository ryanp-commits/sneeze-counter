self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('sneeze-counter-v1').then((cache) => {
      return cache.addAll(['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png']);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== 'sneeze-counter-v1').map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
