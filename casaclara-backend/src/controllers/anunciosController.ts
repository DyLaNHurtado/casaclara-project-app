import { Request, Response } from 'express';
import { AnuncioModel } from '../models/anuncio';
import { Anuncio } from '../types';

export const AnunciosController = {
  async getAll(req: Request, res: Response) {
    try {
      const anuncios = await AnuncioModel.getAll();
      res.json(anuncios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los anuncios' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const anuncio = await AnuncioModel.getById(id);
      if (anuncio) {
        res.json(anuncio);
      } else {
        res.status(404).json({ error: 'Anuncio no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el anuncio' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const anuncio: Omit<Anuncio, 'id' | 'fecha'> = req.body;
      const newAnuncio = await AnuncioModel.create(anuncio);
      res.status(201).json(newAnuncio);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el anuncio' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const anuncio: Partial<Anuncio> = req.body;
      const updatedAnuncio = await AnuncioModel.update(id, anuncio);
      res.json(updatedAnuncio);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el anuncio' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await AnuncioModel.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el anuncio' });
    }
  }
};