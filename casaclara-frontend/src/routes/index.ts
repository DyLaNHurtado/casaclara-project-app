import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DetailsView from '../views/DetailsView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/ad/:id', component: DetailsView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
