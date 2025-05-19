const cacheName = 'flappyBird-v1';
// Se il sito è ospitato in una sottocartella, includi il percorso base, ad esempio:
// const basePath = '/4IB/Ismail/flappyBird/';
// Oppure usa percorsi relativi
const appFiles = [
    'index.html',
    'flappyBird.css',
    'gestioneGioco.js',
    'manifest.json',
    'immagini/flappyBird.ico',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    self.skipWaiting(); // Attiva subito il nuovo Service Worker
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(appFiles).catch(err => {
                console.error("Errore nel caching dei file:", err);
            });
        })
    );
});

self.addEventListener('activate', (e) => {
    console.log("[Service Worker] Activated");
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== cacheName)
                    .map(key => caches.delete(key))
            );
        })
    );
});

// Strategia "Network First, Cache Fallback"
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Se la risposta non è valida, restituiscila così com'è
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                // Clona la risposta per poterla inserire nella cache
                const responseClone = response.clone();
                caches.open(cacheName).then(cache => {
                    cache.put(event.request, responseClone).catch(err => {
                        console.error(`Errore durante cache.put per ${event.request.url}:`, err);
                    });
                });
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
