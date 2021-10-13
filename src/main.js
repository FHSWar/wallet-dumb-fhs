// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

import { Button, Cell, DatetimePicker, SwipeCell, Toast } from 'vant';

// Vue.prototype.dayjs = dayjs;
createApp(App)
    .use(router)
    .use(store)
    .use(Button)
    .use(Cell)
    .use(DatetimePicker)
    .use(SwipeCell)
    .use(Toast)
    .mount('#app')
