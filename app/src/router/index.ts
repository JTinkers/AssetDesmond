import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import StockGridView from '@/views/StockGridView.vue';

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/grid',
    component: StockGridView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
