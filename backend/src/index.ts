import express from 'express';
import dotenv from 'dotenv';
import { configureMiddleware, errorHandler } from './middleware';
import anunciosRoutes from './routes/anuncios';
import { scrapingService } from './services/scrapingService';
import logger from './utils/logger';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureMiddleware(app);

app.use('/api/anuncios', anunciosRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

const server = app.listen(port, async () => {
  logger.info(`Server is running on port ${port}`);
  try {
    await scrapingService.initialize();
  } catch (error) {
    logger.error('Failed to initialize scraping service:', error);
  }
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received. Closing HTTP server and scraping service.');
  await scrapingService.close();
  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received. Closing HTTP server and scraping service.');
  await scrapingService.close();
  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
});

