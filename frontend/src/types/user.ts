export interface User {
    id?: number;
    email: string;
    password: string;
    name: string;
    avatar?: string;
    bio?: string;
    phone?: string;
    role: 'user' | 'admin';
    created_at?: Date;
    updated_at?: Date;
  }