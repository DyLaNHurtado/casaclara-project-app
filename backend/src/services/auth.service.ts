import { UserModel, User } from '../models/user.model';
import { hashPassword } from '../utils/password.util';

export class AuthService {
  static async register(email: string, password: string, name: string): Promise<User> {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create(email, hashedPassword, name);
    return newUser;
  }
}