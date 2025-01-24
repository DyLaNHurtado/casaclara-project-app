import api from './api';

export const scrapeAndSave = async (baseUrl: string, pages: number, source: 'idealista' | 'fotocasa' | 'pisos') => {
    try {
        const response = await api.post('/anuncios/scrape', { baseUrl, pages, source });
        return response.data;
    } catch (error) {
        console.error('Error scraping and saving ads:', error);
        throw error;
    }
};

export const scrapeIdealista = async (baseUrl: string, pages: number) => {
    return scrapeAndSave(baseUrl, pages, 'idealista');
};

export const scrapeFotocasa = async (baseUrl: string, pages: number) => {
    return scrapeAndSave(baseUrl, pages, 'fotocasa');
};

export const scrapePisos = async (baseUrl: string, pages: number) => {
    return scrapeAndSave(baseUrl, pages, 'pisos');
};