// routes/inventario.ts
import { Router } from 'express';
import { Inventario } from '../controllers/inventario';

const router = Router();

router.get('/inventario', Inventario.getInventario);

export default router;