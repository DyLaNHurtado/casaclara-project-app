<template>
  <aside class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-6 text-gray-800">Filtros</h2>
    <form @submit.prevent="applyFilters">
      <div class="space-y-4">
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Categoría:</label>
          <select
            id="category"
            v-model="filters.category"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Todas</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div>
          <label for="price-range" class="block text-sm font-medium text-gray-700 mb-1">
            Precio máximo: {{ formatPrice(filters.maxPrice) }} €
          </label>
          <input
            type="range"
            id="price-range"
            v-model="filters.maxPrice"
            :min="0"
            :max="1000000"
            step="1000"
            class="w-full"
          />
        </div>

        <div>
          <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Ubicación:</label>
          <input
            type="text"
            id="location"
            v-model="filters.location"
            placeholder="Ciudad o zona"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-primary text-white p-2 rounded-md hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Aplicar Filtros
        </button>
      </div>
    </form>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formatPrice } from '@/utils/formatters';

const categories = ['Inmuebles', 'Vehículos', 'Electrónica'];

interface Filters {
  category: string;
  maxPrice: number;
  location: string;
}

const filters = ref<Filters>({
  category: '',
  maxPrice: 1000000,
  location: '',
});

const emit = defineEmits<{
  (e: 'filter', filters: Filters): void
}>();

const applyFilters = () => {
  emit('filter', { ...filters.value });
};
</script>