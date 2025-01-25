import { ScrapingController } from '../controllers/scrapingController';
import { scrapingService } from '../services/scrapingService';
import { AnuncioModel } from '../models/anuncio.model';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

jest.mock('../services/scrapingService');
jest.mock('../models/anuncio');
jest.mock('../utils/logger');

describe('ScrapingController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('scrapeAndSave', () => {
        it('should return 400 if baseUrl, pages, or source are missing', async () => {
            req.body = { baseUrl: '', pages: 0, source: '' };

            await ScrapingController.scrapeAndSave(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'baseUrl, pages, and source are required' });
        });

        it('should return 400 if source is invalid', async () => {
            req.body = { baseUrl: 'http://example.com', pages: 1, source: 'invalid' };

            await ScrapingController.scrapeAndSave(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid source. Must be "idealista", "fotocasa", or "pisos"' });
        });

        it('should scrape and save anuncios', async () => {
            req.body = { baseUrl: 'http://example.com', pages: 1, source: 'idealista' };
            const anuncios = [{ id: 1, title: 'Anuncio 1' }];
            (scrapingService.scrapeMultiplePages as jest.Mock).mockResolvedValue(anuncios);
            (AnuncioModel.createMany as jest.Mock).mockResolvedValue(anuncios);

            await ScrapingController.scrapeAndSave(req as Request, res as Response, next);

            expect(scrapingService.scrapeMultiplePages).toHaveBeenCalledWith('http://example.com', 1, 'idealista');
            expect(AnuncioModel.createMany).toHaveBeenCalledWith(anuncios);
            expect(res.json).toHaveBeenCalledWith({ message: `Scraped and saved ${anuncios.length} anuncios from idealista`, anuncios });
        });

        it('should handle errors', async () => {
            const error = new Error('Test error');
            req.body = { baseUrl: 'http://example.com', pages: 1, source: 'idealista' };
            (scrapingService.scrapeMultiplePages as jest.Mock).mockRejectedValue(error);

            await ScrapingController.scrapeAndSave(req as Request, res as Response, next);

            expect(logger.error).toHaveBeenCalledWith('Error in scrapeAndSave:', error);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('scrapeSource', () => {
        it('should return 400 if baseUrl or pages are missing', async () => {
            req.body = { baseUrl: '', pages: 0 };

            await ScrapingController.scrapeSource(req as Request, res as Response, next, 'idealista');

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'baseUrl and pages are required' });
        });

        it('should scrape and save anuncios for a specific source', async () => {
            req.body = { baseUrl: 'http://example.com', pages: 1 };
            const anuncios = [{ id: 1, title: 'Anuncio 1' }];
            (scrapingService.scrapeMultiplePages as jest.Mock).mockResolvedValue(anuncios);
            (AnuncioModel.createMany as jest.Mock).mockResolvedValue(anuncios);

            await ScrapingController.scrapeSource(req as Request, res as Response, next, 'idealista');

            expect(scrapingService.scrapeMultiplePages).toHaveBeenCalledWith('http://example.com', 1, 'idealista');
            expect(AnuncioModel.createMany).toHaveBeenCalledWith(anuncios);
            expect(res.json).toHaveBeenCalledWith({ message: `Scraped and saved ${anuncios.length} anuncios from idealista`, anuncios });
        });

        it('should handle errors for a specific source', async () => {
            const error = new Error('Test error');
            req.body = { baseUrl: 'http://example.com', pages: 1 };
            (scrapingService.scrapeMultiplePages as jest.Mock).mockRejectedValue(error);

            await ScrapingController.scrapeSource(req as Request, res as Response, next, 'idealista');

            expect(logger.error).toHaveBeenCalledWith('Error in scrapeIdealista:', error);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});