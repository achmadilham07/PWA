const CACHE_NAME = "firstpwa_v1.0.0";
var urlsToCache = [
	"/",
	"/favicon.ico",
	"/index.html",
	"/manifest.json",
	"/nav.html",
	"/package.json",
	"/push.js",
	"/service-worker.js",
	"/css/function.css",
	"/css/materialize.css",
	"/css/materialize.min.css",
	"/images/android-icon-192x192-dunplab-manifest-20405.jpg",
	"/images/apple-icon-57x57-dunplab-manifest-20405.jpg",
	"/images/apple-icon-60x60-dunplab-manifest-20405.jpg",
	"/images/apple-icon-72x72-dunplab-manifest-20405.jpg",
	"/images/apple-icon-76x76-dunplab-manifest-20405.jpg",
	"/images/apple-icon-114x114-dunplab-manifest-20405.jpg",
	"/images/apple-icon-120x120-dunplab-manifest-20405.jpg",
	"/images/apple-icon-144x144-dunplab-manifest-20405.jpg",
	"/images/apple-icon-152x152-dunplab-manifest-20405.jpg",
	"/images/apple-icon-180x180-dunplab-manifest-20405.jpg",
	"/images/favicon-16x16-dunplab-manifest-20405.jpg",
	"/images/favicon-32x32-dunplab-manifest-20405.jpg",
	"/images/favicon-96x96-dunplab-manifest-20405.jpg",
	"/images/icon-512.jpg",
	"/images/icon.png",
	"/js/api.js",
	"/js/db_football.js",
	"/js/db.js",
	"/js/function.js",
	"/js/idb.js",
	"/js/match_detail_check.js",
	"/js/match_detail.js",
	"/js/match_latest.js",
	"/js/match_standing.js",
	"/js/match_upcoming.js",
	"/js/materialize.js",
	"/js/materialize.min.js",
	"/js/nav.js",
	"/js/player_detail_check.js",
	"/js/player_detail.js",
	"/js/team_detail_check.js",
	"/js/team_detail.js",
	"/pages/favorite.html",
	"/pages/home.html",
	"/pages/latest_upcoming_match.html",
	"/pages/match_detail.html",
	"/pages/player_detail.html",
	"/pages/team_detail.html"
];
 
self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function (event) {
	var BASE_API = "https://api.football-data.org/v2/";
	if (event.request.url.indexOf(BASE_API) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function (cache){
				return fetch(event.request).then(function (response){
					cache.put(event.request.url, response.clone());
					console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
					return response;
				})
			})
		)
	} else {
		event.respondWith(
			caches.match(event.request,{ignoreSearch:true}).then(function (response){
				console.log(
					"ServiceWorker: Memuat aset dari server: ",
					event.request.url
				);
				return response || fetch(event.request);
			})
		)
	}
	// event.respondWith(
	// 	caches
	// 		.match(event.request, {
	// 			cacheName: CACHE_NAME
	// 		})
	// 		.then(function (response) {
	// 			if (response) {
	// 				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
	// 				return response;
	// 			}

	// 			console.log(
	// 				"ServiceWorker: Memuat aset dari server: ",
	// 				event.request.url
	// 			);
	// 			return fetch(event.request);
	// 		})
	// );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function (event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: './images/icon-512.jpg',
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