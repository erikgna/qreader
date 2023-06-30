if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("service-worker.js").then(
      function (registration) {
        console.log("Service Worker registrado com sucesso:", registration);
      },
      function (error) {
        console.log("Falha ao registrar o Service Worker:", error);
      }
    );
  });
}

const CACHE_NAME = "qreader-v1";
const urlsToCache = ["index.html", "icon.png", "scripts.js"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
