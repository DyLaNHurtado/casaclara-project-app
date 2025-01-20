import type { Anuncio } from '@/types/anuncio';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const fetchAds = async (params?: Record<string, any>) => {
    const response = await api.get('/anuncios', { params });
    return response.data;
};

export const fetchAdDetails = async (id: number) => {
    const response = await api.get(`/anuncios/${id}`);
    return response.data;
};

export const createAd = async (adData: Omit<Anuncio, 'id'>) => {
    const response = await api.post('/', adData);
    return response.data;
};
export const createManyAds = async (adsList: Omit<Anuncio[], 'id'>) => {
    const response = await api.post('/many', adsList);
    return response.data;
};

export const updateAd = async (id: number, adData: Partial<Anuncio>) => {
    const response = await api.put(`/anuncios/${id}`, adData);
    return response.data;
};

export const deleteAd = async (id: number) => {
    await api.delete(`/anuncios/${id}`);
};