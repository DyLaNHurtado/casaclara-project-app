<template>
    <aside class="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Filtros</h2>
  
      <!-- Filtro de Categoría -->
      <div class="mb-4">
        <label for="category" class="block text-sm font-bold">Categoría:</label>
        <select id="category" v-model="filters.category" class="w-full p-2 border rounded">
          <option value="">Todas</option>
          <option value="Inmuebles">Inmuebles</option>
          <option value="Vehículos">Vehículos</option>
          <option value="Electrónica">Electrónica</option>
        </select>
      </div>
  
      <!-- Filtro de Precio -->
      <div class="mb-4">
        <label for="price-range" class="block text-sm font-bold">Rango de Precio (€):</label>
        <input type="range" id="price-range" v-model="filters.price" :min="0" :max="200000" step="1000" />
        <p class="text-sm mt-2">Hasta: <strong>{{ filters.price }} €</strong></p>
      </div>
  
      <!-- Filtro de Ubicación -->
      <div class="mb-4">
        <label for="location" class="block text-sm font-bold">Ubicación:</label>
        <input type="text" id="location" v-model="filters.location" placeholder="Ciudad o zona" class="w-full p-2 border rounded" />
      </div>
  
      <!-- Botón Aplicar -->
      <button
        class="w-full bg-blue-600 text-white p-2 rounded"
        @click="applyFilters"
      >
        Aplicar Filtros
      </button>
    </aside>
  </template>
  
  <script>
  export default {
    name: "Filters",
    data() {
      return {
        filters: {
          category: "",
          price: 200000,
          location: "",
        },
      };
    },
    methods: {
      applyFilters() {
        this.$emit("filter", { ...this.filters });
      },
    },
  };
  </script>
  