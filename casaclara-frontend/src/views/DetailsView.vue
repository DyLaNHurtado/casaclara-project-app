<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold">{{ ad.title }}</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img :src="ad.image" alt="Imagen" class="w-full h-64 object-cover" />
        <div>
          <p class="text-lg">{{ ad.description }}</p>
          <p class="text-green-600 font-bold text-lg">{{ ad.price }} €</p>
          <p class="text-gray-500">📍 {{ ad.location }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DetailsView",
    props: ["id"],
    data() {
      return {
        ad: {}, // Aquí se cargarán los datos específicos
      };
    },
    mounted() {
      // Simula la carga de datos
      this.ad = {
        title: "Apartamento en el centro",
        description: "Un apartamento acogedor en pleno centro de la ciudad.",
        price: 120000,
        location: "Madrid",
        image: "https://via.placeholder.com/300",
      };
    },
  };
  </script>
  