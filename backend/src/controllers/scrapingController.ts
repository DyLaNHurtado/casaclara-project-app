import { NextFunction, Request, Response } from 'express';
import { scrapingService } from '../services/scrapingService';
import { AnuncioModel } from '../models/anuncio.model';
import logger from '../utils/logger';

export const ScrapingController = {
  async scrapeAndSave(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { baseUrl, pages, source } = req.body;

      if (!baseUrl || !pages || !source) {
        res.status(400).json({ error: 'baseUrl, pages, and source are required' });
        return;
      }

      if (!['idealista', 'fotocasa', 'pisos'].includes(source)) {
        res.status(400).json({ error: 'Invalid source. Must be "idealista", "fotocasa", or "pisos"' });
        return;
      }

      const anuncios = await scrapingService.scrapeMultiplePages(baseUrl, pages, source as 'idealista' | 'fotocasa' | 'pisos');

      // Guardar los anuncios en la base de datos
      const savedAnuncios = await AnuncioModel.createMany(anuncios);

      logger.info(`Scraped and saved ${savedAnuncios.length} anuncios from ${source}`);
      res.json({ message: `Scraped and saved ${savedAnuncios.length} anuncios from ${source}`, anuncios: savedAnuncios });
    } catch (error) {
      logger.error('Error in scrapeAndSave:', error);
      next(error);
    }
  },

  async scrapeIdealista(req: Request, res: Response, next: NextFunction): Promise<void> {
    await this.scrapeSource(req, res, next, 'idealista');
  },

  async scrapeFotocasa(req: Request, res: Response, next: NextFunction): Promise<void> {
    await this.scrapeSource(req, res, next, 'fotocasa');
  },

  async scrapePisos(req: Request, res: Response, next: NextFunction): Promise<void> {
    await this.scrapeSource(req, res, next, 'pisos');
  },

  async scrapeSource(req: Request, res: Response, next: NextFunction, source: 'idealista' | 'fotocasa' | 'pisos'): Promise<void> {
    try {
      const { baseUrl, pages } = req.body;

      if (!baseUrl || !pages) {
        res.status(400).json({ error: 'baseUrl and pages are required' });
        return;
      }

      const anuncios = await scrapingService.scrapeMultiplePages(baseUrl, pages, source);

      // Guardar los anuncios en la base de datos
      const savedAnuncios = await AnuncioModel.createMany(anuncios);

      logger.info(`Scraped and saved ${savedAnuncios.length} anuncios from ${source}`);
      res.json({ message: `Scraped and saved ${savedAnuncios.length} anuncios from ${source}`, anuncios: savedAnuncios });
    } catch (error) {
      logger.error(`Error in scrape${source.charAt(0).toUpperCase() + source.slice(1)}:`, error);
      next(error);
    }
  }
};

