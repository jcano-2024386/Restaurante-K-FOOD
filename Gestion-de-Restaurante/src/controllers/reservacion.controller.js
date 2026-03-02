import Reservacion from '../models/reservacion.model.js';
import Mesa from '../models/mesa.model.js';
import Sucursal from '../models/sucursal.model.js';

export const createReservacion = async (req, res) => {
    try {
        const { mesa, sucursal, fecha, hora, numeroPersonas, observaciones } = req.body;

        const sucursalExiste = await Sucursal.findOne({ _id: sucursal, estado: true });
        if (!sucursalExiste) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        const mesaExiste = await Mesa.findOne({ _id: mesa, estado: true, sucursal });
        if (!mesaExiste) {
            return res.status(404).json({ success: false, message: 'Mesa no encontrada en esta sucursal' });
        }

        if (mesaExiste.capacidad < numeroPersonas) {
            return res.status(400).json({
                success: false,
                message: `La mesa tiene capacidad para ${mesaExiste.capacidad} persona(s), pero se solicitaron ${numeroPersonas}`
            });
        }

        // Verificar que no haya otra reservación activa en la misma mesa, fecha y hora
        const fechaDate = new Date(fecha);
        const reservacionExiste = await Reservacion.findOne({
            mesa,
            fecha: fechaDate,
            hora,
            estado: { $in: ['PENDIENTE', 'CONFIRMADA'] }
        });

        if (reservacionExiste) {
            return res.status(400).json({ success: false, message: 'Ya existe una reservación para esa mesa en esa fecha y hora' });
        }

        const reservacion = new Reservacion({
            cliente: req.user.id,
            mesa,
            sucursal,
            fecha: fechaDate,
            hora,
            numeroPersonas,
            observaciones
        });

        await reservacion.save();

        res.status(201).json({ success: true, message: 'Reservación creada correctamente', data: reservacion });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la reservación', error: error.message });
    }
};

export const getReservaciones = async (req, res) => {
    try {
        const { estado } = req.query;
        const filtro = estado ? { estado } : {};

        const reservaciones = await Reservacion.find(filtro)
            .populate('cliente', 'nombre email telefono')
            .populate('mesa', 'numero capacidad')
            .populate('sucursal', 'nombre')
            .sort({ fecha: 1, hora: 1 });

        res.status(200).json({ success: true, total: reservaciones.length, data: reservaciones });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las reservaciones', error: error.message });
    }
};

export const getReservacionById = async (req, res) => {
    try {
        const { id } = req.params;

        const reservacion = await Reservacion.findById(id)
            .populate('cliente', 'nombre email telefono')
            .populate('mesa', 'numero capacidad')
            .populate('sucursal', 'nombre direccion');

        if (!reservacion) {
            return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
        }

        // Solo el cliente o un admin/gerente pueden ver la reservación
        if (req.user.role === 'CLIENTE' && reservacion.cliente._id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Sin permiso para ver esta reservación' });
        }

        res.status(200).json({ success: true, data: reservacion });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la reservación', error: error.message });
    }
};

export const getMisReservaciones = async (req, res) => {
    try {
        const reservaciones = await Reservacion.find({ cliente: req.user.id })
            .populate('mesa', 'numero capacidad')
            .populate('sucursal', 'nombre')
            .sort({ fecha: -1 });

        res.status(200).json({ success: true, total: reservaciones.length, data: reservaciones });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener tus reservaciones', error: error.message });
    }
};

export const updateEstadoReservacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const estadosValidos = ['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA'];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ success: false, message: `Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}` });
        }

        const reservacion = await Reservacion.findByIdAndUpdate(id, { estado }, { new: true })
            .populate('cliente', 'nombre email')
            .populate('mesa', 'numero');

        if (!reservacion) {
            return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
        }

        res.status(200).json({ success: true, message: `Reservación actualizada a "${estado}"`, data: reservacion });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar la reservación', error: error.message });
    }
};

export const cancelarReservacion = async (req, res) => {
    try {
        const { id } = req.params;

        const reservacion = await Reservacion.findById(id);
        if (!reservacion) {
            return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
        }

        // Solo el cliente dueño o admin pueden cancelar
        if (req.user.role === 'CLIENTE' && reservacion.cliente.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Sin permiso para cancelar esta reservación' });
        }

        if (reservacion.estado === 'CANCELADA') {
            return res.status(400).json({ success: false, message: 'La reservación ya está cancelada' });
        }

        reservacion.estado = 'CANCELADA';
        await reservacion.save();

        res.status(200).json({ success: true, message: 'Reservación cancelada', data: reservacion });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cancelar la reservación', error: error.message });
    }
};
