<template>
  <div v-if="ad" class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ ad.nombre }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img :src="ad.fotos[0] || '/placeholder-image.jpg'" :alt="ad.nombre" class="w-full h-96 object-cover rounded-lg shadow-md">
        <div v-if="ad.fotos.length > 1" class="mt-4 grid grid-cols-4 gap-2">
          <img
            v-for="(foto, index) in ad.fotos.slice(1, 5)"
            :key="index"
            :src="foto"
            :alt="`${ad.nombre} - imagen ${index + 2}`"
            class="w-full h-24 object-cover rounded-md cursor-pointer"
            @click="setMainImage(foto)"
          >
        </div>
      </div>
      <div>
        <p class="text-2xl font-bold text-primary mb-4">{{ formatPrice(ad.precio) }} €</p>
        <p class="text-gray-600 mb-4 flex items-center">
          <IconMapPin class="w-5 h-5 mr-2" />
          {{ ad.ubicacion }}
        </p>
        <p class="text-gray-800 mb-6">{{ ad.descripcion }}</p>
        <div class="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 class="text-lg font-semibold mb-2 text-gray-800">Detalles</h2>
          <ul class="space-y-2">
            <li><strong>Categoría:</strong> {{ ad.categoria }}</li>
            <li><strong>Tipo:</strong> {{ ad.tipo }}</li>
            <!-- Añadir más detalles según sea necesario -->
          </ul>
        </div>
        <button
          @click="contactSeller"
          class="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Contactar con el vendedor
        </button>
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAdStore } from '@/stores/adStore';
import type { Anuncio } from '@/types/anuncio';
import { IconMapPin } from '@/components/common/icons';
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

const setMainImage = (imageUrl: string) => {
  if (ad.value) {
    ad.value.fotos = [imageUrl, ...ad.value.fotos.filter(foto => foto !== imageUrl)];
  }
};

const contactSeller = () => {
  // Implementar lógica para contactar al vendedor
  console.log('Contactando al vendedor...');
};
</script>