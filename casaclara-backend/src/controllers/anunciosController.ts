import { Request, Response, NextFunction } from 'express';
import { AnuncioModel } from '../models/anuncio';
import { Anuncio } from '../types/anuncio';

export const AnunciosController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const anuncios = await AnuncioModel.getAll();
      res.json(anuncios);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const anuncio = await AnuncioModel.getById(id);
      if (anuncio) {
        res.json(anuncio);
      } else {
        res.status(404).json({ error: 'Anuncio no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const anuncio: Omit<Anuncio, 'id' | 'fecha'> = req.body;
      const newAnuncio = await AnuncioModel.create(anuncio);
      res.status(201).json(newAnuncio);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const anuncio: Partial<Anuncio> = req.body;
      const updatedAnuncio = await AnuncioModel.update(id, anuncio);
      res.json(updatedAnuncio);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await AnuncioModel.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};