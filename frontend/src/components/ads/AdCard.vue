<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
    <img :src="ad.fotos[0] || '/placeholder-image.jpg'" :alt="ad.nombre" class="w-full h-48 object-cover">
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2 text-gray-800">{{ ad.nombre }}</h2>
      <p class="text-sm text-gray-600 mb-2">{{ ad.categoria }}</p>
      <p class="text-lg font-bold text-primary mb-2">{{ formatPrice(ad.precio) }} €</p>
      <p class="text-sm text-gray-600 flex items-center">
        <IconMapPin class="w-4 h-4 mr-1" />
        {{ ad.ubicacion }}
      </p>
    </div>
    <div class="px-4 py-3 bg-gray-100 flex justify-between items-center">
      <button
        @click="toggleFavorite"
        :class="{'text-primary': isFavorite, 'text-secondary': !isFavorite}"
        class="hover:text-primary focus:outline-none"
        :aria-label="isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'"
      >
        <IconHeart :class="{ 'fill-current': isFavorite }" class="w-6 h-6" />
      </button>
      <RouterLink
        :to="{ name: 'details', params: { id: ad.id } }"
        class="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Ver detalles
      </RouterLink>
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
import type { PropType } from 'vue';

const props = defineProps({
  ad: {
    type: Object as PropType<Anuncio>,
    required: true
  }
});

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