<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
    <img :src="ad.fotos[0] || '/placeholder-image.jpg'" :alt="ad.nombre" class="w-full h-48 object-cover">
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2 text-gray-800">{{ ad.nombre }}</h2>
      <p class="text-sm text-gray-600 mb-2">{{ ad.categoria }}</p>
      <p class="text-xl font-bold text-primary mb-2">{{ formatPrice(ad.precio) }} €</p>
      <p class="text-sm text-gray-600 flex items-center mb-4">
        <IconMapPin class="w-4 h-4 mr-1" />
        {{ ad.ubicacion }}
      </p>
      <div class="flex justify-between items-center">
        <button
          @click="toggleFavorite"
          :class="{'text-primary': isFavorite, 'text-gray-400': !isFavorite}"
          class="hover:text-primary focus:outline-none transition-colors duration-200"
        >
          <IconHeart :class="{ 'fill-current': isFavorite }" class="w-6 h-6" />
        </button>
        <RouterLink
          :to="{ name: 'details', params: { id: ad.id } }"
          class="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200"
        >
          Ver detalles
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { Anuncio } from '@/types/anuncio';
import { IconMapPin, IconHeart } from '@/components/common/icons';
import { formatPrice } from '@/utils/formatters';
import { useAdStore } from '@/stores/adStore';

const props = defineProps<{ ad: Anuncio }>();

const adStore = useAdStore();
const isFavorite = computed(() => adStore.favoriteAds.some(favAd => favAd.id === props.ad.id));

const toggleFavorite = () => {
  if (isFavorite.value) {
    adStore.removeFavoriteAd(props.ad.id!);
  } else {
    adStore.addFavoriteAd(props.ad);
  }
};
</script>