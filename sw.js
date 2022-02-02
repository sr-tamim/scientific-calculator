// service worker file
const staticCacheName = 'calculator-v1.5.0';
const assets = [
    '/scientific-calculator/',
    '/scientific-calculator/index.html',
    '/scientific-calculator/style/style.css',
    '/scientific-calculator/script/script.js',
    '/scientific-calculator/script/app.js',
    '/scientific-calculator/img/favicon.ico',
    'https://fonts.googleapis.com/css2?family=PT+Sans&family=Charm&family=Tangerine&display=swap',
];

// install service worker
self.addEventListener('install', event => {
    // console.log('service worker has been installed');
    // pre-caching assets
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            // console.log('caching shell assets');
            cache.addAll(assets)
        })
    );
});

// activate event
self.addEventListener('activate', event => {
    // console.log('service worker has been activated');
    // delete previous caches
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

// fetch event
self.addEventListener('fetch', event => {
    // console.log('fetch event', event);
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    );
})