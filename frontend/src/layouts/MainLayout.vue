<template>
    <div class="flex flex-col min-h-screen">
      <NavBar />
      <main class="flex-grow bg-gray-100">
        <slot></slot>
      </main>
      <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto px-4 text-center">
          &copy; {{ currentYear }} CasaClara. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import NavBar from '@/components/common/NavBar.vue';
  
  const currentYear = computed(() => new Date().getFullYear());
  </script>