import { Router } from 'express';
import {
    createCategoria,
    getCategorias,
    getCategoriaById,
    getCategoriasByRestaurante,
    updateCategoria,
    deleteCategoria
} from '../controllers/categoria.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateRole } from '../../middlewares/validate-role.js';

const router = Router();

router.post('/',                                validateJWT, validateRole('ADMIN', 'GERENTE'), createCategoria);
router.get('/',                                 validateJWT, getCategorias);
router.get('/restaurante/:restauranteId',       validateJWT, getCategoriasByRestaurante);
router.get('/:id',                              validateJWT, getCategoriaById);
router.put('/:id',                              validateJWT, validateRole('ADMIN', 'GERENTE'), updateCategoria);
router.delete('/:id',                           validateJWT, validateRole('ADMIN'), deleteCategoria);

export default router;
