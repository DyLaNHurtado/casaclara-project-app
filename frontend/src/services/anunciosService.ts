import type { Anuncio } from '@/types/anuncio';
import api from './api';

export const getAllAds = async (params?: Record<string, any>) => {
    try {
        const response = await api.get('/anuncios', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching ads:', error);
        throw error;
    }
};

export const getAdById = async (id: number) => {
    try {
        const response = await api.get(`/anuncios/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ad details:', error);
        throw error;
    }
};

export const postAd = async (adData: Omit<Anuncio, 'id'>) => {
    try {
        const response = await api.post('/anuncios', adData);
        return response.data;
    } catch (error) {
        console.error('Error creating ad:', error);
        throw error;
    }
};

export const postManyAds = async (adsList: Omit<Anuncio[], 'id'>) => {
    try {
        const response = await api.post('/anuncios/createMany', adsList);
        return response.data;
    } catch (error) {
        console.error('Error creating many ads:', error);
        throw error;
    }
};

export const putAd = async (id: number, adData: Partial<Anuncio>) => {
    try {
        const response = await api.put(`/anuncios/${id}`, adData);
        return response.data;
    } catch (error) {
        console.error('Error updating ad:', error);
        throw error;
    }
};

export const deleteAd = async (id: number) => {
    try {
        await api.delete(`/anuncios/${id}`);
    } catch (error) {
        console.error('Error deleting ad:', error);
        throw error;
    }
};