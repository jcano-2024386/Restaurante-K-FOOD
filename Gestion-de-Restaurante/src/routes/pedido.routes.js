import { Router } from 'express';
import {
    createPedido,
    getPedidos,
    getPedidoById,
    updateEstadoPedido,
    getPedidosBySucursal
} from '../controllers/pedido.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateRole } from '../../middlewares/validate-role.js';

const router = Router();

router.post('/',                            validateJWT, validateRole('ADMIN', 'GERENTE', 'MESERO'), createPedido);
router.get('/',                             validateJWT, validateRole('ADMIN', 'GERENTE'), getPedidos);
router.get('/sucursal/:sucursalId',         validateJWT, validateRole('ADMIN', 'GERENTE', 'MESERO'), getPedidosBySucursal);
router.get('/:id',                          validateJWT, getPedidoById);
router.put('/:id/estado',                   validateJWT, validateRole('ADMIN', 'GERENTE', 'MESERO'), updateEstadoPedido);

export default router;
