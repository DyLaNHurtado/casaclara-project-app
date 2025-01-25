import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, name } = req.body;
      const user = await AuthService.register(email, password, name);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      next(error);
    }
  }

/*     static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        const { email, password } = req.body;
        const token = await AuthService.login(email, password);
        res.json({ token });
        } catch (error) {
        next(error);
        }
    }
    static async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Token not found' });
            return;
        }
        const user = await AuthService.verifyToken(token);
        res.json({ user });
        } catch (error) {
        next(error);
        }
    } */
}