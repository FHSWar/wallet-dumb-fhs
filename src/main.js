// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import './iconfont'

import { DatetimePicker } from 'vant';

// Vue.prototype.dayjs = dayjs;
createApp(App)
    .use(router)
    .use(DatetimePicker)
    .mount('#app')
