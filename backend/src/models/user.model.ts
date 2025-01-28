import { supabase } from '../config/supabase';
import { User } from '../types/user';
import logger from '../utils/logger';

export const UserModel = {
  async create(email: string, hashedPassword: string, name: string, avatar?: string, bio?: string, phone?: string, role: 'user' | 'admin' = 'user'): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword, name, avatar, bio, phone, role }])
      .single();

    if (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
    return data;
  },

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      logger.error(`Error fetching user with email ${email}:`, error);
      return null;
    }
    return data;
  },

  async update(id: number, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .single();

    if (error) {
      logger.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
    return data;
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }
};