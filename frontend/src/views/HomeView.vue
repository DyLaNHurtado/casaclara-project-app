<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Anuncios Destacados</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <Filters @filter="applyFilters" />
      <div class="md:col-span-3">
        <div v-if="isLoading" class="text-center py-8">
          <Spinner />
        </div>
        <div v-else-if="error" class="text-center py-8">
          <p class="text-xl text-red-600">{{ error }}</p>
        </div>
        <div v-else-if="filteredAds.length === 0" class="text-center py-8">
          <p class="text-xl">No se encontraron anuncios que coincidan con los filtros aplicados.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <transition-group name="fade" tag="div">
            <AdCard
              v-for="ad in filteredAds"
              :key="ad.id"
              :ad="ad"
            />
          </transition-group>
        </div>
        <div ref="loadMoreTrigger" class="h-10 mt-8"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAdStore } from '@/stores/adStore';
import Filters from '@/components/ads/Filters.vue';
import AdCard from '@/components/ads/AdCard.vue';
import Spinner from '@/components/common/Spinner.vue';

const adStore = useAdStore();
const isLoading = computed(() => adStore.isLoading);
const error = computed(() => adStore.error);
const filteredAds = computed(() => adStore.filteredAds);
const loadMoreTrigger = ref<HTMLElement | null>(null);

const fetchAds = async (filters = {}) => {
  if (isLoading.value) return;
  adStore.isLoading = true;
  adStore.error = null;
  try {
    await adStore.fetchAds(filters);
  } catch (err) {
    adStore.error = 'Error al cargar los anuncios';
    console.error(err);
  } finally {
    adStore.isLoading = false;
  }
};

const applyFilters = (filters: any) => {
  fetchAds(filters);
};

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    fetchAds();
  }
};

onMounted(() => {
  fetchAds();
  const observer = new IntersectionObserver(handleIntersect);
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

onUnmounted(() => {
  if (loadMoreTrigger.value) {
    const observer = new IntersectionObserver(handleIntersect);
    observer.unobserve(loadMoreTrigger.value);
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>