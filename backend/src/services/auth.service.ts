import { UserModel } from '../models/user.model';
import { User } from '../types/user';
import { hashPassword, comparePasswords } from '../utils/password.util';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  static async register(email: string, password: string, name: string, avatar?: string, bio?: string, phone?: string): Promise<User> {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create(email, hashedPassword, name, avatar, bio, phone);
    return newUser;
  }

  static async login(email: string, password: string): Promise<string> {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  static async verifyToken(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
      const user = await UserModel.findByEmail(decoded.email);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}