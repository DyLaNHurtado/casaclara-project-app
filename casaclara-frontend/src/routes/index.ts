import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/DetailsView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'ad/:id', name: 'adDetails', component: DetailsView, props: true },
      // Añadir más rutas aquí
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;