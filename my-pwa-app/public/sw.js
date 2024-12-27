self.addEventListener('install', (event) => {
    console.log('Service Worker 已安裝');
    self.skipWaiting(); // 立即激活 Service Worker
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker 已激活');
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('攔截請求:', event.request.url);
  });
  
  self.addEventListener('notificationclick', (event) => {
    console.log('通知被點擊:', event.notification);
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/') // 打開 PWA 頁面
    );
  });
  