import { Router } from 'express';
import {
    createEvento,
    getEventos,
    getEventoById,
    getEventosBySucursal,
    updateEvento,
    deleteEvento
} from '../controllers/evento.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateRole } from '../../middlewares/validate-role.js';

const router = Router();

router.post('/',                            validateJWT, validateRole('ADMIN', 'GERENTE'), createEvento);
router.get('/',                             validateJWT, getEventos);
router.get('/sucursal/:sucursalId',         validateJWT, getEventosBySucursal);
router.get('/:id',                          validateJWT, getEventoById);
router.put('/:id',                          validateJWT, validateRole('ADMIN', 'GERENTE'), updateEvento);
router.delete('/:id',                       validateJWT, validateRole('ADMIN'), deleteEvento);

export default router;
