<template>
  <nav class="bg-primary text-white">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <RouterLink to="/" class="text-2xl font-bold">CasaClara</RouterLink>
      <ul class="flex space-x-6">
        <li>
          <RouterLink to="/" class="hover:text-secondary transition-colors" active-class="font-semibold">
            Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/favoritos" class="hover:text-secondary transition-colors" active-class="font-semibold">
            Favoritos
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>