import { Router } from 'express';
import HorarioController from '../controllers/horario';

const router = Router();

router.post('/', HorarioController.createHorario);
router.put('/restore/:id', HorarioController.restoreHorario);
router.put('/:id', HorarioController.updateHorario);
router.delete('/:id', HorarioController.deleteHorario);
router.get('/all/:state', HorarioController.getHorarioList);
router.get('/:id', HorarioController.getHorario);


export default router;