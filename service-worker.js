const CACHE_NAME = "v1";
const assets = [
    'index.html',
    'offline.html',
    'images/HomeImage.jpg',
    'images/WeatherForecastIcon.png',
    'app.css',
    'app.js'
];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(assets);
        })
        .catch(err => console.log('Cache error:', err))
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(res => {
            return res || fetch(event.request)
                .catch(() => caches.match('/offline.html'))
        })
        .catch(err => console.log('Cache error:', err))
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});