import { supabase } from '../config/supabase';
import { Anuncio } from '../types';

export const AnuncioModel = {
  async create(anuncio: Omit<Anuncio, 'id' | 'fecha'>): Promise<Anuncio> {
    const { data, error } = await supabase
      .from('anuncios')
      .insert([anuncio])
      .single();

    if (error) throw error;
    return data;
  },

  async getAll(): Promise<Anuncio[]> {
    const { data, error } = await supabase
      .from('anuncios')
      .select('*');

    if (error) throw error;
    return data;
  },

  async getById(id: number): Promise<Anuncio | null> {
    const { data, error } = await supabase
      .from('anuncios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: number, anuncio: Partial<Anuncio>): Promise<Anuncio> {
    const { data, error } = await supabase
      .from('anuncios')
      .update(anuncio)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('anuncios')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};