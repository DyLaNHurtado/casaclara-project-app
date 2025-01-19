import express from 'express';
import { AnunciosController } from '../controllers/anunciosController';
import { validateAnuncio } from '../middleware/validation';
import { ScrapingController } from '../controllers/scrapingController';

const router = express.Router();

router.get('/', AnunciosController.getAll);
router.get('/:id', AnunciosController.getById);
router.post('/', validateAnuncio, AnunciosController.create);
router.put('/:id', validateAnuncio, AnunciosController.update);
router.delete('/:id', AnunciosController.delete);

router.post('/scrape', ScrapingController.scrapeAndSave);
router.post('/scrape/idealista', ScrapingController.scrapeIdealista);
router.post('/scrape/fotocasa', ScrapingController.scrapeFotocasa);
router.post('/scrape/pisos', ScrapingController.scrapePisos);

export default router;

