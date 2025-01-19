<template>
    <div class="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Sidebar de Filtros -->
      <Filters @filter="applyFilters" />
  
      <!-- Lista de Anuncios -->
      <div class="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AdCard
          v-for="ad in filteredAds"
          :key="ad.id"
          :ad="ad"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Filters from "../components/Filters.vue";
  import AdCard from "../components/AdCard.vue";
  
  export default {
    name: "HomeView",
    components: { Filters, AdCard },
    data() {
      return {
        ads: [
          // Datos simulados
          { id: 1, title: "Apartamento céntrico", category: "Inmuebles", price: 120000, location: "Madrid", image: "https://via.placeholder.com/300" },
          { id: 2, title: "Coche compacto", category: "Vehículos", price: 8000, location: "Barcelona", image: "https://via.placeholder.com/300" },
          { id: 3, title: "Televisor 4K", category: "Electrónica", price: 600, location: "Valencia", image: "https://via.placeholder.com/300" },
        ],
        filteredAds: [],
      };
    },
    methods: {
      applyFilters(filters) {
        this.filteredAds = this.ads.filter(ad => {
          return (
            (filters.category === "" || ad.category === filters.category) &&
            ad.price <= filters.price &&
            (filters.location === "" || ad.location.toLowerCase().includes(filters.location.toLowerCase()))
          );
        });
      },
    },
    mounted() {
      // Inicializa los anuncios filtrados
      this.filteredAds = this.ads;
    },
  };
  </script>
  