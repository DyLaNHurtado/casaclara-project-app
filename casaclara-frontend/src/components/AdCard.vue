<template>
    <div class="bg-white rounded-lg shadow-md p-4">
      <img :src="ad.image" alt="Imagen del anuncio" class="w-full h-32 object-cover rounded-t-lg" />
      <h2 class="text-lg font-bold mt-2">{{ ad.title }}</h2>
      <p class="text-sm text-gray-500">{{ ad.category }}</p>
      <p class="text-lg font-bold text-green-600">{{ ad.price }} €</p>
      <p class="text-sm text-gray-500">📍 {{ ad.location }}</p>
      <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver Detalles</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdCard",
    props: {
      ad: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
    