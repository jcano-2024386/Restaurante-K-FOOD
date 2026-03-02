import { Router } from 'express';
import {
    createReservacion,
    getReservaciones,
    getReservacionById,
    getMisReservaciones,
    updateEstadoReservacion,
    cancelarReservacion
} from '../controllers/reservacion.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateRole } from '../../middlewares/validate-role.js';

const router = Router();

router.post('/',                    validateJWT, createReservacion);
router.get('/',                     validateJWT, validateRole('ADMIN', 'GERENTE'), getReservaciones);
router.get('/mis-reservaciones',    validateJWT, getMisReservaciones);
router.get('/:id',                  validateJWT, getReservacionById);
router.put('/:id/estado',           validateJWT, validateRole('ADMIN', 'GERENTE'), updateEstadoReservacion);
router.put('/:id/cancelar',         validateJWT, cancelarReservacion);

export default router;
