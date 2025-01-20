<template>
  <nav class="bg-neutral text-secondary border-b border-gray-200">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <span @click="goHome" class="text-2xl font-bold cursor-pointer">CasaClara</span>
      <ul class="flex space-x-6">
        <li v-for="route in routes" :key="route.path">
          <RouterLink :to="route.path" :class="getLinkClass(route.path)">
            <span class="flex flex-row">
              <component :is="route.icon" class="w-6 h-6 mr-2" />
              {{ route.name }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';
import { IconHome, IconHeart } from '@/components/common/icons';
import router from '@/routes';

const routes = ref([
  { path: '/', name: 'Inicio', icon: IconHome },
  { path: '/favorites', name: 'Favoritos', icon: IconHeart },
]);

const route = useRoute();

const getLinkClass = (path: string) => {
  return route.path === path ? 'text-primary hover:text-primary' : 'text-gray-400 hover:text-gray-600 transition-colors focus:scale-105';
};

const goHome = () => {
  router.push('/');
};
</script>