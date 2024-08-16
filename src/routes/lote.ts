import { Router } from 'express'
import LoteController from '../controllers/lote'

const router = Router();

router.get('/all', LoteController.getAllLotes);
router.get('/byIdProduct/:idProducto', LoteController.getAllbyIdProducto);
router.get('/:id', LoteController.getLoteById);
router.post('/', LoteController.createLote);
router.put('/:id', LoteController.updateLote);
router.delete('/:id', LoteController.deleteLote);
router.put('/restore/:id', LoteController.restoreLote);

export default router;