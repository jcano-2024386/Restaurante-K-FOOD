import { Router } from 'express';
import {
    createMesa,
    getMesas,
    getMesaById,
    getMesasBySucursal,
    updateMesa,
    deleteMesa
} from '../controllers/mesa.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateRole } from '../../middlewares/validate-role.js';

const router = Router();

router.post('/',                            validateJWT, validateRole('ADMIN', 'GERENTE'), createMesa);
router.get('/',                             validateJWT, getMesas);
router.get('/sucursal/:sucursalId',         validateJWT, getMesasBySucursal);
router.get('/:id',                          validateJWT, getMesaById);
router.put('/:id',                          validateJWT, validateRole('ADMIN', 'GERENTE'), updateMesa);
router.delete('/:id',                       validateJWT, validateRole('ADMIN'), deleteMesa);

export default router;
