import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './utils/router';


const pinia = createPinia();

const app = createApp(App)
app.use(pinia)
app.use(router) // after pinia because router depends on it
app.mount('#app');
