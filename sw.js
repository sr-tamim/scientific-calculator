// service worker file
const staticCacheName = 'calculator-v1.1.3';
const assets = [
    'https://tamim9.github.io/scientific-calculator/',
    'https://tamim9.github.io/scientific-calculator/index.html',
    'https://tamim9.github.io/scientific-calculator/style/style.css',
    'https://tamim9.github.io/scientific-calculator/script/script.js',
    'https://tamim9.github.io/scientific-calculator/script/app.js',
    'https://tamim9.github.io/scientific-calculator/img/favicon.ico',
    'https://fonts.googleapis.com/css2?family=PT+Sans&family=Charm&family=Tangerine&display=swap',
    'https://fonts.gstatic.com/s/ptsans/v16/jizaRExUiTo99u79D0KExQ.woff2',
    'https://fonts.gstatic.com/s/tangerine/v15/IurY6Y5j_oScZZow4VOxCZZM.woff2',
    'https://fonts.gstatic.com/s/charm/v8/7cHmv4oii5K0MdYoK-4.woff2',
    'https://fonts.gstatic.com/s/ptsans/v16/jizaRExUiTo99u79D0KExQ.woff2',
    'https://fonts.gstatic.com/s/tangerine/v15/IurY6Y5j_oScZZow4VOxCZZM.woff2',
    'https://fonts.gstatic.com/s/charm/v8/7cHmv4oii5K0MdYoK-4.woff2'
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