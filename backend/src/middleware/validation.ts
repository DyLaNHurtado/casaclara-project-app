import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateAnuncio = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    nombre: Joi.string().required(),
    telefono: Joi.string().required(),
    tipo: Joi.string().valid('particular', 'inmobiliaria').required(),
    categoria: Joi.string().required(),
    precio: Joi.number().required(),
    ubicacion: Joi.string().required(),
    coordenadas: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required()
    }).required(),
    fotos: Joi.array().items(Joi.string()).required(),
    descripcion: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};