// 木質節拍器 Service Worker
// ⚠️ 每次更新 index.html 時，請同步修改 VERSION 與 NOTES（並與 index.html 的 APP_VERSION 一致），
//    手機端才會偵測到新版並跳出更新通知。
const VERSION = '1.5.0';
const NOTES = '新增大鼓、小鼓、風鈴、雨聲筒、顫音琴五種音色';
const CACHE_NAME = 'metronome-' + VERSION;
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 安裝：預先快取所有資源（cache:'reload' 繞過 HTTP 快取，確保抓到最新檔案）
// 不自動 skipWaiting，等使用者在畫面上按「立即更新」再接手
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' })))
    )
  );
});

// 頁面傳來的訊息：查詢版本 / 立即更新
self.addEventListener('message', event => {
  const data = event.data || {};
  if (data.type === 'GET_VERSION' && event.ports[0]) {
    event.ports[0].postMessage({ version: VERSION, notes: NOTES });
  } else if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 啟動：清除舊版快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// 攔截請求：Cache First（離線優先），只處理同源 GET 請求
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
