<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Anuncios Destacados</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <Filters @filter="applyFilters" />
      <div class="md:col-span-3">
        <div v-if="isLoading" class="text-center py-8">
          <p class="text-xl">Cargando anuncios...</p>
        </div>
        <div v-else-if="error" class="text-center py-8">
          <p class="text-xl text-red-600">{{ error }}</p>
        </div>
        <div v-else-if="filteredAds.length === 0" class="text-center py-8">
          <p class="text-xl">No se encontraron anuncios que coincidan con los filtros aplicados.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdCard
            v-for="ad in filteredAds"
            :key="ad.id"
            :ad="ad"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useAdStore } from '@/stores/adStore';
import Filters from '@/components/ads/Filters.vue';
import AdCard from '@/components/ads/AdCard.vue';
const adStore = useAdStore();

const isLoading = computed(() => adStore.isLoading);
const error = computed(() => adStore.error);
const filteredAds = computed(() => adStore.filteredAds);

onMounted(() => {
  adStore.fetchAds();
});

const applyFilters = (filters: any) => {
  adStore.fetchAds(filters);
};
</script>