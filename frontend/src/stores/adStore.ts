import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Anuncio } from '../types/anuncio';
import { getAllAds, getAdById, postAd, postManyAds, putAd, deleteAd } from '../services/anunciosService';

export const useAdStore = defineStore('adStore', () => {
  const ads = ref<Anuncio[]>([]);
  const favoriteAds = ref<Anuncio[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const filteredAds = computed(() => {
    return ads.value;
  });

  const fetchAds = async (params?: Record<string, any>) => {
    isLoading.value = true;
    error.value = null;
    try {
      ads.value = await getAllAds(params);
    } catch (err) {
      error.value = 'Error al cargar los anuncios. No se pudo conectar con el servidor.';
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
      return await getAdById(id);
    } catch (err) {
      error.value = 'Error al cargar los detalles del anuncio';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const createAd = async (adData: Omit<Anuncio, 'id'>) => {
    isLoading.value = true;
    error.value = null;
    try {
      return await postAd(adData);
    } catch (err) {
      error.value = 'Error al crear el anuncio';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const createManyAds = async (adsList: Omit<Anuncio[], 'id'>) => {
    isLoading.value = true;
    error.value = null;
    try {
      return await postManyAds(adsList);
    } catch (err) {
      error.value = 'Error al crear varios anuncios';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const updateAd = async (adId: number, adData: Anuncio) => {
    isLoading.value = true;
    error.value = null;
    try {
      return await putAd(adId, adData);
    } catch (err) {
      error.value = 'Error al actualizar el anuncio';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteAdById = async (adId: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      await deleteAd(adId);
    } catch (err) {
      error.value = 'Error al eliminar el anuncio';
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
    fetchAdDetails,
    createAd,
    createManyAds,
    updateAd,
    deleteAdById,
    saveFavoriteAds,
    loadFavoriteAds,
    addFavoriteAd,
    removeFavoriteAd,
  };
});