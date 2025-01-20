<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div class="flex flex-col items-center">
        <svg class="h-32 w-32 text-gray-600 mb-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"></path>
        </svg>
        <h1 class="text-4xl font-bold mb-4">Página no encontrada</h1>
        <p class="text-lg mb-8">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
        <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYW5zNjB1ZHNldXpseHV5cnkyZnF1c20yNHRuZWxwaXlqcjZraGoyMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/geDYq73orMiMLQ1bH5/giphy.gif" alt="Lost House" class="mb-8 w-64 h-64 object-cover rounded-lg shadow-lg">
        <p class="text-lg mb-8">Parece que esta casa se ha perdido también...</p>
        <RouterLink to="/" class="text-primary hover:underline text-lg">Volver a la página principal</RouterLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router';
  </script>
  
  <style scoped>
  .text-primary {
    color: #DBBB31;
  }
  </style>