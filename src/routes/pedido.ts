import { Router } from 'express';
import pedidoController from '../controllers/pedido';

const router = Router();

router.get('/getAll', pedidoController.getAll);
router.get('/:id', pedidoController.getById);
router.post('/', pedidoController.create);
router.put('/:id', pedidoController.update);
router.delete('/:id', pedidoController.delete);

export default router;
