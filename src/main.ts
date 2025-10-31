import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './components/router'; 

import './assets/styles/reset.css';
import './assets/styles/fonte.css';
import './assets/styles/estilo.css';
import './assets/styles/responsivo.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router); 
app.mount('#app');