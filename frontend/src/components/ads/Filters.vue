<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <form @submit.prevent="applyFilters" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            step="10000"
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
      </div>
      <button
        type="submit"
        class="w-full bg-primary text-white p-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Buscar
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formatPrice } from '@/utils/formatters';

const categories = ['Pisos', 'Casas', 'Locales', 'Garajes', 'Oficinas'];

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