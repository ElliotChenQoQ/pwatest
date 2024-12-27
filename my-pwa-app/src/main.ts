import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js') // 指向你的 Service Worker 文件
        .then((registration) => {
          console.log('Service Worker 註冊成功:', registration);
        })
        .catch((error) => {
          console.error('Service Worker 註冊失敗:', error);
        });
    });
  }