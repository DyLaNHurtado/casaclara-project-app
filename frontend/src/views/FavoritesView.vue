<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">Favoritos</h1>
      <div v-if="isLoading" class="text-center py-8">
        <p class="text-xl">Cargando anuncios favoritos...</p>
      </div>
      <div v-else-if="error" class="text-center py-8">
        <p class="text-xl text-red-600">{{ error }}</p>
      </div>
      <div v-else-if="favoriteAds.length === 0" class="text-center py-8">
        <p class="text-xl">No tienes anuncios favoritos.</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdCard
          v-for="ad in favoriteAds"
          :key="ad.id"
          :ad="ad"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, computed } from 'vue';
  import { useAdStore } from '@/stores/adStore';
  import AdCard from '@/components/ads/AdCard.vue';
  
  const adStore = useAdStore();
  
  const isLoading = computed(() => adStore.isLoading);
  const error = computed(() => adStore.error);
  const favoriteAds = computed(() => adStore.favoriteAds);
  
  onMounted(() => {
    adStore.loadFavoriteAds();
    console.log("fav")
  });
  </script>