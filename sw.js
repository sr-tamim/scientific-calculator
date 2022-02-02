// service worker file
const staticCacheName = 'calculator-v1.5.5';
const assets = [
    '/scientific-calculator/',
    '/scientific-calculator/index.html',
    '/scientific-calculator/style/style.css',
    '/scientific-calculator/script/script.js',
    '/scientific-calculator/script/app.js',
    '/scientific-calculator/img/favicon.ico',
    // fonts links
    'https://fonts.gstatic.com/s/charm/v8/7cHmv4oii5K0MdY8K-4E4Q.woff2',
    'https://fonts.gstatic.com/s/charm/v8/7cHmv4oii5K0MdYnK-4E4Q.woff2',
    'https://fonts.gstatic.com/s/charm/v8/7cHmv4oii5K0MdYmK-4E4Q.woff2',
    'https://fonts.gstatic.com/s/charm/v8/7cHmv4oii5K0MdYoK-4.woff2',
    'https://fonts.gstatic.com/s/ptsans/v16/jizaRExUiTo99u79D0-ExdGM.woff2',
    'https://fonts.gstatic.com/s/ptsans/v16/jizaRExUiTo99u79D0aExdGM.woff2',
    'https://fonts.gstatic.com/s/ptsans/v16/jizaRExUiTo99u79D0yExdGM.woff2v',
    'https://fonts.gstatic.com/s/ptsans/v16/jizaRExUiTo99u79D0KExQ.woff2',
    'https://fonts.gstatic.com/s/tangerine/v15/IurY6Y5j_oScZZow4VOxCZZM.woff2'
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