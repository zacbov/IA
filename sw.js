const CACHE_NAME = 'routeur-ia-v1';
const SHELL_FILES = ['./index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Stratégie : réseau d'abord (pour toujours avoir la dernière version des API),
// repli sur le cache uniquement si hors-ligne — ne cache QUE la coquille de l'appli,
// jamais les appels vers les moteurs IA (qui ne doivent jamais être servis en cache).
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const isShellFile = SHELL_FILES.some((f) => url.endsWith(f.replace('./', '')));
  if (!isShellFile) return; // laisse passer tout le reste normalement (API, images, etc.)

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
