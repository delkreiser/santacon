/**
 * Service Worker for Boulder SantaCon PWA.
 *
 * Strategy:
 *  - INSTALL: pre-cache the app shell (index.html, icons, Font Awesome)
 *  - FETCH:
 *      • Same-origin assets → cache-first (JS/CSS bundles, images)
 *      • Navigation requests → network-first, fall back to cached index.html
 *      • Cross-origin (CDN fonts/icons) → stale-while-revalidate
 *      • Google Maps iframes → network only (not cacheable)
 *
 * Bump CACHE_VERSION to invalidate old caches after a deploy.
 */

const CACHE_VERSION = 'santacon-v1';

// Pre-cached during install — the bare minimum for offline use
const PRECACHE_URLS = [
    '/',
    '/manifest.json',
    '/img/icon-192.png',
    '/img/icon-512.png',
    '/img/icon-180.png',
    '/img/favicon.ico',
    '/img/header.webp',
    '/img/header.jpg',
];

// --- INSTALL: pre-cache shell ---
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_URLS))
    );
    self.skipWaiting();
});

// --- ACTIVATE: clean up old caches ---
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// --- FETCH ---
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip Google Maps iframes and other third-party APIs
    if (url.hostname.includes('google.com') || url.hostname.includes('googleapis.com')) return;

    // Navigation requests (page loads) → network-first, fall back to cached shell
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
                    return response;
                })
                .catch(() => caches.match('/'))
        );
        return;
    }

    // Same-origin assets (JS, CSS, images) → cache-first
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;
                return fetch(request).then((response) => {
                    // Only cache successful responses
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
                    }
                    return response;
                });
            })
        );
        return;
    }

    // Cross-origin (CDN: Font Awesome, fonts) → stale-while-revalidate
    event.respondWith(
        caches.match(request).then((cached) => {
            const networkFetch = fetch(request).then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
                }
                return response;
            }).catch(() => cached);

            return cached || networkFetch;
        })
    );
});
