<template>
    <div>
        <h1>PWA Web Notifications</h1>
        <button @click="requestPermission">請求通知權限</button>
        <button @click="showNotification">顯示通知</button>
    </div>
</template>

<script>
export default {
    methods: {
        requestPermission() {
            if ('Notification' in window) {
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        alert('通知權限已授予');
                    } else {
                        alert('通知權限被拒絕');
                    }
                });
            } else {
                alert('此瀏覽器不支持通知功能');
            }
        },
       showNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('Hello from PWA!', {
                body: '這是一條來自 Service Worker 的通知',
                icon: '/icon-192x192.png',
                vibrate: [200, 100, 200], // 可選：添加震動效果
                tag: 'pwa-notification', // 可選：通知標籤，防止重複通知
            });
        });
    } else {
        alert('請先授予通知權限');
    }
}

    },
};
</script>
