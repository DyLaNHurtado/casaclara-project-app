<template>
  <div v-if="ad" class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img :src="ad.fotos[0] || '/placeholder-image.jpg'" :alt="ad.nombre" class="w-full h-64 object-cover">
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-4 text-gray-800">{{ ad.nombre }}</h1>
        <p class="text-2xl font-bold text-primary mb-4">{{ formatPrice(ad.precio) }} €</p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm">{{ ad.categoria }}</span>
          <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm flex items-center">
            <IconMapPin class="w-4 h-4 mr-1" />
            {{ ad.ubicacion }}
          </span>
        </div>
        <p class="text-gray-600 mb-6">{{ ad.descripcion }}</p>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div v-for="(foto, index) in ad.fotos.slice(1, 5)" :key="index">
            <img :src="foto" :alt="`${ad.nombre} - imagen ${index + 2}`" class="w-full h-32 object-cover rounded-md">
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button
            @click="toggleFavorite"
            :class="{'text-primary': isFavorite, 'text-gray-400': !isFavorite}"
            class="flex items-center space-x-2 hover:text-primary focus:outline-none transition-colors duration-200"
          >
            <IconHeart :class="{ 'fill-current': isFavorite }" class="w-6 h-6" />
            <span>{{ isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos' }}</span>
          </button>
          <button
            @click="contactSeller"
            class="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            Contactar con el vendedor
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="isLoading" class="container mx-auto px-4 py-8 text-center">
    <p class="text-xl">Cargando detalles del anuncio...</p>
  </div>
  <div v-else class="container mx-auto px-4 py-8 text-center">
    <p class="text-xl text-red-600">Error al cargar los detalles del anuncio.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAdStore } from '@/stores/adStore';
import type { Anuncio } from '@/types/anuncio';
import { IconMapPin, IconHeart } from '@/components/common/icons';
import { formatPrice } from '@/utils/formatters';

const route = useRoute();
const adStore = useAdStore();

const ad = ref<Anuncio | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  const id = Number(route.params.id);
  try {
    ad.value = await adStore.fetchAdDetails(id);
  } catch (error) {
    console.error('Error fetching ad details:', error);
  } finally {
    isLoading.value = false;
  }
});

const isFavorite = computed(() => adStore.favoriteAds.some(favAd => favAd.id === ad.value?.id));

const toggleFavorite = () => {
  if (ad.value) {
    if (isFavorite.value) {
      adStore.removeFavoriteAd(ad.value.id!);
    } else {
      adStore.addFavoriteAd(ad.value);
    }
  }
};

const contactSeller = () => {
  // Implementar lógica para contactar al vendedor
  console.log('Contactando al vendedor...');
};
</script>