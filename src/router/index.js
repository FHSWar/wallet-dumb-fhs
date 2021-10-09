import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Bill from '../views/home/Bill.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'bill',
        name: 'Bill',
        component: Bill,
      },
      {
        path: 'chart',
        name: 'Chart',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/Chart.vue'),
      },
      {
        path: 'mine',
        name: 'Mine',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/Mine.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/chargeUp',
    name: 'ChargeUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChargeUp.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
