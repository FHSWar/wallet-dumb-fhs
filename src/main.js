// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

import { Button, Cell, DatetimePicker, SwipeCell, Tab, Tabs, Toast } from 'vant';

createApp(App)
    .use(router)
    .use(store)
    .use(Button)
    .use(Cell)
    .use(DatetimePicker)
    .use(SwipeCell)
    .use(Tab)
    .use(Tabs)
    .use(Toast)
    .mount('#app')
