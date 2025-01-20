import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Anuncio } from '@/types/anuncio';
import * as api from '@/services/api';

export const useAdStore = defineStore('adStore', () => {
  const ads = ref<Anuncio[]>([]);
  const favoriteAds = ref<Anuncio[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const filteredAds = computed(() => {
    // Implementar lógica de filtrado aquí
    return ads.value;
  });

  const fetchAds = async (params?: Record<string, any>) => {
    isLoading.value = true;
    error.value = null;
    try {
      ads.value = await api.fetchAds(params);
    } catch (err) {
      error.value = 'Error al cargar los anuncios';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const loadFavoriteAds = () => {
    const storedFavorites = localStorage.getItem('favoriteAds');
    if (storedFavorites) {
      favoriteAds.value = JSON.parse(storedFavorites);
    }
  };

  const saveFavoriteAds = () => {
    localStorage.setItem('favoriteAds', JSON.stringify(favoriteAds.value));
  };

  const addFavoriteAd = (ad: Anuncio) => {
    if (!favoriteAds.value.some(favAd => favAd.id === ad.id)) {
      favoriteAds.value.push(ad);
      saveFavoriteAds();
    }
  };

  const removeFavoriteAd = (adId: number) => {
    favoriteAds.value = favoriteAds.value.filter(ad => ad.id !== adId);
    saveFavoriteAds();
  };

  const fetchAdDetails = async (id: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      return await api.fetchAdDetails(id);
    } catch (err) {
      error.value = 'Error al cargar los detalles del anuncio';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    ads,
    favoriteAds,
    filteredAds,
    isLoading,
    error,
    fetchAds,
    loadFavoriteAds,
    addFavoriteAd,
    removeFavoriteAd,
    fetchAdDetails,
  };
});