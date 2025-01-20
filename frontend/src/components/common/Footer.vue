<template>
  <footer class="bg-gray-800 text-white py-4">
    <div class="container mx-auto px-4 text-center">
      &copy; {{ currentYear }} CasaClara. Todos los derechos reservados.
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>