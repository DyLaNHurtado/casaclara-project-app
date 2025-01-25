import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
      { path: 'ad/:id', name: 'adDetails', component: () => import('@/views/AdDetailsView.vue'), props: true },
      { path: 'favorites', name: 'favorites', component: () => import('@/views/FavoritesView.vue') },
      { path: 'notifications', name: 'notifications', component: () => import('@/views/NotificationsView.vue') },
/*       { path: 'settings', name: 'settings', component: () => import('@/views/SettingsView.vue') }, */
/*       { path: 'contact', name: 'contact', component: () => import('@/views/ContactView.vue') },
      { path: 'about', name: 'about', component: () => import('@/views/AboutView.vue') }, */
/*       { path: 'profile', name: 'profile', component: () => import('@/views/ProfileView.vue') },
      { path: 'my-ads', name: 'my-ads', component: () => import('@/views/MyAdsView.vue') },
      { path: 'register', name: 'register', component: () => import('@/views/RegisterView.vue') },
      { path: 'login', name: 'login', component: () => import('@/views/LoginView.vue') }, */
/*       { path: 'advanced-search', name: 'advanced-search', component: () => import('@/views/AdvancedSearchView.vue') }, */
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;