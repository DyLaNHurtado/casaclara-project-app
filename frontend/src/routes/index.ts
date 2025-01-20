import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/DetailsView.vue';
import FavoritesView from '@/views/FavoritesView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'ad/:id', name: 'details', component: DetailsView, props: true },
      { path: 'favorites', name: 'favorites', component: FavoritesView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;