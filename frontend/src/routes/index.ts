import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/DetailsView.vue';
import FavoritesView from '@/views/FavoritesView.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'ad/:id', name: 'details', component: DetailsView, props: true },
      { path: 'favorites', name: 'favorites', component: FavoritesView },
      // { path: 'contact', name: 'contact', component: ContactView },
      // { path: 'about', name: 'about', component: AboutView },
      // { path: 'profile', name: 'profile', component: ProfileView },
      // { path: 'my-ads', name: 'my-ads', component: MyAdsView },
      // { path: 'register', name: 'register', component: RegisterView },
      // { path: 'login', name: 'login', component: LoginView },
      // { path: 'advanced-search', name: 'advanced-search', component: AdvancedSearchView },
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