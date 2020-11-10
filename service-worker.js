importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {url: '/', revision: '1'},
  {url: '/nav.html', revision: '1'},
  {url: 'manifest.json', revision: '1'},
  {url: '/index.html', revision: '1'},
  {url: '/detailTeam.html', revision: '1'},
  {url: '/pages/teams.html', revision: '1'},
  {url: '/pages/klasemen.html', revision: '1'},
  {url: '/pages/contact.html', revision: '1'},
  {url: '/pages/savedTeams.html', revision: '1'},
  {url: '/css/materialize.min.css', revision: '1'},
  {url: '/js/materialize.min.js', revision: '1'},
  {url: '/js/nav.js', revision: '1'},
  {url: '/js/api.js', revision: '1'},
  {url: '/js/index.js', revision: '1'},
  {url: '/js/detailTeamIndex.js', revision: '1'},
  {url: '/js/db.js', revision: '1'},
  {url: '/js/idb.js', revision: '1'},
  {url: '/icons/icon-72x72.png', revision: '1'},
  {url: '/icons/icon-96x96.png', revision: '1'},
  {url: '/icons/icon-128x128.png', revision: '1'},
  {url: '/icons/icon-144x144.png', revision: '1'},
  {url: '/icons/icon-152x152.png', revision: '1'},
  {url: '/icons/icon-192x192.png', revision: '1'},
  {url: '/icons/icon-384x384.png', revision: '1'},
  {url: '/icons/icon-512x512.png', revision: '1'},
  {url: '/img/ajax-loader.gif', revision: '1'},
],{
ignoreUrlParametersMatching: [/.*/]
})

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages"
    })
);

workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});