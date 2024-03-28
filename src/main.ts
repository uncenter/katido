import { createApp } from 'vue';
import './styles.css';
import App from './App.vue';

import { Buffer as BufferPolyfill } from 'buffer';
globalThis.Buffer = BufferPolyfill;

createApp(App).mount('#app');
