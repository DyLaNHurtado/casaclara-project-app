import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from '../utils/logger';

export const configureMiddleware = (app: express.Application) => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
};