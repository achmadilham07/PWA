importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    { url: '/', revision: '1'},
    { url: '/favicon.ico', revision: '1'},
    { url: '/index.html', revision: '1'},
    { url: '/manifest.json', revision: '1'},
    { url: '/nav.html', revision: '1'},
    { url: '/package.json', revision: '1'},
    { url: '/push.js', revision: '1'},
    { url: '/sw.js', revision: '1'},
    { url: '/css/function.css', revision: '1'},
    { url: '/css/materialize.css', revision: '1'},
    { url: '/css/materialize.min.css', revision: '1'},
    { url: '/images/android-icon-192x192-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/apple-icon-57x57-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/apple-icon-60x60-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/apple-icon-72x72-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/apple-icon-76x76-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/apple-icon-114x114-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/apple-icon-120x120-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/apple-icon-144x144-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/apple-icon-152x152-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/apple-icon-180x180-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/favicon-16x16-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/favicon-32x32-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/favicon-96x96-dunplab-manifest-26227.png', revision: '1'},
    { url: '/images/icon-512.png', revision: '1'},
    { url: '/images/icon.png', revision: '1'},
    { url: '/js/api.js', revision: '1'},
    { url: '/js/db_football.js', revision: '1'},
    { url: '/js/db.js', revision: '1'},
    { url: '/js/function.js', revision: '1'},
    { url: '/js/idb.js', revision: '1'},
    { url: '/js/load-sw.js', revision: '1'},
    { url: '/js/match_detail_check.js', revision: '1'},
    { url: '/js/match_detail.js', revision: '1'},
    { url: '/js/match_latest.js', revision: '1'},
    { url: '/js/match_standing.js', revision: '1'},
    { url: '/js/match_upcoming.js', revision: '1'},
    { url: '/js/materialize.js', revision: '1'},
    { url: '/js/materialize.min.js', revision: '1'},
    { url: '/js/nav.js', revision: '1'},
    { url: '/js/player_detail_check.js', revision: '1'},
    { url: '/js/player_detail.js', revision: '1'},
    { url: '/js/register-sw.js', revision: '1'},
    { url: '/js/team_detail_check.js', revision: '1'},
    { url: '/js/team_detail.js', revision: '1'},
    { url: '/pages/favorite.html', revision: '1'},
    { url: '/pages/home.html', revision: '1'},
    { url: '/pages/latest_upcoming_match.html', revision: '1'},
    { url: '/pages/match_detail.html', revision: '1'},
    { url: '/pages/player_detail.html', revision: '1'},
    { url: '/pages/team_detail.html', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  ], {
    ignoreUrlParametersMatching: [/.*/]
  }
);

workbox.routing.registerRoute(
  new RegExp('/css/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'styles'
  })
);

workbox.routing.registerRoute(
  new RegExp('/js/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'javascript'
  })
);

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico|webmanifest|eot,ttf,woff,woff2)$/,
  workbox.strategies.staleWhileRevalidate({
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'Api-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ]
  })
);

workbox.routing.registerRoute(
  'https://fonts.googleapis.com/(.*)',
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: { statuses: [0, 200] }
  })
);

self.addEventListener('push', (event) => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }

  let options = {
    body: body,
    icon: './images/icon-512.png',
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