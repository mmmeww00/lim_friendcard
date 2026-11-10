// 앱 화면을 기기에 저장해 두고, 새 버전이 있으면 받아 오는 서비스 워커
const CACHE = 'frenka-v1';
const SHELL = ['./', './index.html', './firebase-config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Firebase 데이터 요청은 건드리지 않음 (Firestore가 자체적으로 오프라인 캐시를 씀)
  if (url.origin !== location.origin && url.hostname !== 'www.gstatic.com' && url.hostname !== 'fonts.googleapis.com' && url.hostname !== 'fonts.gstatic.com') return;

  // 같은 사이트 파일: 네트워크 먼저, 안 되면 저장본
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }

  // Firebase SDK, 글꼴: 저장본 먼저
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
    return res;
  })));
});
