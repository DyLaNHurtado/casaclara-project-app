<template>
    <div class="absolute right-0 top-14 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
      <div class="py-1">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.href" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <component :is="item.icon" class="w-5 h-5 mr-3 text-gray-400" />
          {{ item.name }}
        </router-link>
      </div>
      <div class="border-t border-gray-200">
        <button @click="logout" class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <IconLogOut class="w-5 h-5 mr-3 text-gray-400" />
          Cerrar sesión
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IconUser, IconHome, IconSettings, IconHeart, IconLogOut } from '@/components/common/icons';
  
  const menuItems = [
    { name: 'Mi perfil', href: '/profile', icon: IconUser },
    { name: 'Mis anuncios', href: '/my-ads', icon: IconHome },
    { name: 'Favoritos', href: '/favorites', icon: IconHeart },
    { name: 'Configuración', href: '/settings', icon: IconSettings },
  ];
  
  const logout = () => {
    console.log('Logout');
    // Implement logout logic here
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>