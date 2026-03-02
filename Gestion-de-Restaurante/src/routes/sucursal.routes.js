import { Router } from 'express';
import {
    createSucursal,
    getSucursales,
    getSucursalById,
    getSucursalesByRestaurante,
    updateSucursal,
    deleteSucursal
} from '../controllers/sucursal.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateRole } from '../../middlewares/validate-role.js';

const router = Router();

router.post('/',                                validateJWT, validateRole('ADMIN', 'GERENTE'), createSucursal);
router.get('/',                                 validateJWT, getSucursales);
router.get('/restaurante/:restauranteId',       validateJWT, getSucursalesByRestaurante);
router.get('/:id',                              validateJWT, getSucursalById);
router.put('/:id',                              validateJWT, validateRole('ADMIN', 'GERENTE'), updateSucursal);
router.delete('/:id',                           validateJWT, validateRole('ADMIN'), deleteSucursal);

export default router;
