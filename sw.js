/* CONTROL — service worker
   Mục đích: mở được app ngoài sân khi wifi nhà thi đấu chập chờn.
   Chiến lược: stale-while-revalidate cho tài nguyên cùng origin.
   Vừa có offline, vừa tự cập nhật khi bạn push bản mới.
   Đổi CACHE khi phát hành phiên bản mới để dọn cache cũ. */

const CACHE = 'control-v1';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Bỏ qua thumbnail YouTube và mọi tài nguyên khác origin — để trình duyệt tự lo.
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);

      return cached || network;
    })
  );
});
