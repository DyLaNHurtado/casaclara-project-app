import express from 'express';
import { AnunciosController } from '../controllers/anunciosController';

const router = express.Router();

router.get('/', AnunciosController.getAll);
router.get('/:id', AnunciosController.getById);
router.post('/', AnunciosController.create);
router.put('/:id', AnunciosController.update);
router.delete('/:id', AnunciosController.delete);

export default router;