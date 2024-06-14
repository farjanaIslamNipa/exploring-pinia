import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { VueReCaptcha } from 'vue-recaptcha-v3'

const app = createApp(App)


app.use(router)

app.component('VueDatePicker', VueDatePicker);
app.use(VueReCaptcha, { siteKey: '6LcSTfYpAAAAAO6fjEYsVW1lb5GfvRwKATOHzfkf' });
app.use(createPinia())
app.mount('#app')
