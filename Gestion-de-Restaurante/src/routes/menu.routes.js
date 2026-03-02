import { Router } from 'express';
import {
    createMenu,
    getMenus,
    getMenuById,
    getMenusByRestaurante,
    updateMenu,
    deleteMenu
} from '../controllers/menu.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateRole } from '../../middlewares/validate-role.js';

const router = Router();

router.post('/',                                validateJWT, validateRole('ADMIN', 'GERENTE'), createMenu);
router.get('/',                                 validateJWT, getMenus);
router.get('/restaurante/:restauranteId',       validateJWT, getMenusByRestaurante);
router.get('/:id',                              validateJWT, getMenuById);
router.put('/:id',                              validateJWT, validateRole('ADMIN', 'GERENTE'), updateMenu);
router.delete('/:id',                           validateJWT, validateRole('ADMIN'), deleteMenu);

export default router;
