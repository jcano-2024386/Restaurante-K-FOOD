import { Router } from 'express';
import { getEstadisticas } from '../controllers/estadisticas.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateRole } from '../../middlewares/validate-role.js';

const router = Router();

router.get('/', validateJWT, validateRole('ADMIN', 'GERENTE'), getEstadisticas);

export default router;
