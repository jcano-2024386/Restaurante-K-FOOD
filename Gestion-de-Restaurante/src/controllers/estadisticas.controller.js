import Restaurante from '../models/restaurantes.model.js';
import Sucursal from '../models/sucursal.model.js';
import Mesa from '../models/mesa.model.js';
import Pedido from '../models/pedido.model.js';
import Reservacion from '../models/reservacion.model.js';
import Evento from '../models/evento.model.js';
import Usuario from '../models/user.model.js';
import Menu from '../models/menu.model.js';

export const getEstadisticas = async (req, res) => {
    try {
        const [
            totalRestaurantes,
            totalSucursales,
            totalMesas,
            mesasDisponibles,
            totalUsuarios,
            totalMenus,
            totalPedidos,
            pedidosPendientes,
            pedidosEnProceso,
            totalReservaciones,
            reservacionesPendientes,
            totalEventos
        ] = await Promise.all([
            Restaurante.countDocuments({ estado: true }),
            Sucursal.countDocuments({ estado: true }),
            Mesa.countDocuments({ estado: true }),
            Mesa.countDocuments({ estado: true, disponible: true }),
            Usuario.countDocuments({ estado: true }),
            Menu.countDocuments({ estado: true }),
            Pedido.countDocuments({}),
            Pedido.countDocuments({ estado: 'PENDIENTE' }),
            Pedido.countDocuments({ estado: 'EN_PROCESO' }),
            Reservacion.countDocuments({}),
            Reservacion.countDocuments({ estado: 'PENDIENTE' }),
            Evento.countDocuments({ estado: { $ne: 'CANCELADO' } })
        ]);

        // Calcular ingresos totales de pedidos entregados
        const ingresosResult = await Pedido.aggregate([
            { $match: { estado: 'ENTREGADO' } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const ingresosTotales = ingresosResult[0]?.total || 0;

        res.status(200).json({
            success: true,
            data: {
                restaurantes: { total: totalRestaurantes },
                sucursales: { total: totalSucursales },
                mesas: { total: totalMesas, disponibles: mesasDisponibles, ocupadas: totalMesas - mesasDisponibles },
                usuarios: { total: totalUsuarios },
                menus: { total: totalMenus },
                pedidos: { total: totalPedidos, pendientes: pedidosPendientes, enProceso: pedidosEnProceso },
                reservaciones: { total: totalReservaciones, pendientes: reservacionesPendientes },
                eventos: { total: totalEventos },
                ingresosTotales
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener estadísticas', error: error.message });
    }
};
