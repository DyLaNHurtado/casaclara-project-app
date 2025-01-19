import { supabase } from '../config/supabase';
import { Anuncio } from '../types/anuncio';
import logger from '../utils/logger';

export const AnuncioModel = {
  async create(anuncio: Omit<Anuncio, 'id' | 'fecha'>): Promise<Anuncio> {
    const { data, error } = await supabase
      .from('anuncios')
      .insert([{
        ...anuncio,
        coordenadas: `POINT(${anuncio.coordenadas.lng} ${anuncio.coordenadas.lat})`,
        fotos: JSON.stringify(anuncio.fotos)
      }])
      .single();

    if (error) {
      logger.error('Error creating anuncio:', error);
      throw error;
    }
    return data;
  },

  async getAll(): Promise<Anuncio[]> {
    const { data, error } = await supabase
      .from('anuncios')
      .select('*');

    if (error) {
      logger.error('Error fetching anuncios:', error);
      throw error;
    }
    return data.map(this.parseAnuncio);
  },

  async getById(id: number): Promise<Anuncio | null> {
    const { data, error } = await supabase
      .from('anuncios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error(`Error fetching anuncio with id ${id}:`, error);
      throw error;
    }
    return data ? this.parseAnuncio(data) : null;
  },

  async update(id: number, anuncio: Partial<Anuncio>): Promise<Anuncio> {
    const updateData = { ...anuncio };
    if (anuncio.coordenadas) {
      updateData.coordenadas = { lat: anuncio.coordenadas.lat, lng: anuncio.coordenadas.lng };
    }
    if (anuncio.fotos) {
      updateData.fotos = anuncio.fotos;
    }

    const { data, error } = await supabase
      .from('anuncios')
      .update(updateData)
      .eq('id', id)
      .single();

    if (error) {
      logger.error(`Error updating anuncio with id ${id}:`, error);
      throw error;
    }
    return this.parseAnuncio(data);
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('anuncios')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error(`Error deleting anuncio with id ${id}:`, error);
      throw error;
    }
  },

  parseAnuncio(data: any): Anuncio {
    const [lng, lat] = data.coordenadas.replace('POINT(', '').replace(')', '').split(' ');
    return {
      ...data,
      coordenadas: { lat: parseFloat(lat), lng: parseFloat(lng) },
      fotos: JSON.parse(data.fotos)
    };
  }
};

