import Evento from '../models/evento.model.js';
import Sucursal from '../models/sucursal.model.js';

export const createEvento = async (req, res) => {
    try {
        const { nombre, descripcion, fecha, horaInicio, horaFin, capacidadMaxima, precioEntrada, sucursal } = req.body;

        const sucursalExiste = await Sucursal.findOne({ _id: sucursal, estado: true });
        if (!sucursalExiste) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        if (horaInicio >= horaFin) {
            return res.status(400).json({ success: false, message: 'La hora de inicio debe ser menor a la hora de fin' });
        }

        const evento = new Evento({
            nombre,
            descripcion,
            fecha: new Date(fecha),
            horaInicio,
            horaFin,
            capacidadMaxima,
            precioEntrada: precioEntrada || 0,
            sucursal,
            organizador: req.user.id
        });

        await evento.save();

        res.status(201).json({ success: true, message: 'Evento creado correctamente', data: evento });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el evento', error: error.message });
    }
};

export const getEventos = async (req, res) => {
    try {
        const { estado } = req.query;
        const filtro = estado ? { estado } : {};

        const eventos = await Evento.find(filtro)
            .populate('sucursal', 'nombre direccion')
            .populate('organizador', 'nombre email')
            .sort({ fecha: 1 });

        res.status(200).json({ success: true, total: eventos.length, data: eventos });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los eventos', error: error.message });
    }
};

export const getEventoById = async (req, res) => {
    try {
        const { id } = req.params;

        const evento = await Evento.findById(id)
            .populate('sucursal', 'nombre direccion')
            .populate('organizador', 'nombre email');

        if (!evento) {
            return res.status(404).json({ success: false, message: 'Evento no encontrado' });
        }

        res.status(200).json({ success: true, data: evento });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el evento', error: error.message });
    }
};

export const getEventosBySucursal = async (req, res) => {
    try {
        const { sucursalId } = req.params;
        const { estado } = req.query;

        const filtro = { sucursal: sucursalId };
        if (estado) filtro.estado = estado;

        const eventos = await Evento.find(filtro)
            .populate('organizador', 'nombre')
            .sort({ fecha: 1 });

        res.status(200).json({ success: true, total: eventos.length, data: eventos });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los eventos', error: error.message });
    }
};

export const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { organizador, ...datosActualizables } = req.body;

        if (datosActualizables.horaInicio && datosActualizables.horaFin) {
            if (datosActualizables.horaInicio >= datosActualizables.horaFin) {
                return res.status(400).json({ success: false, message: 'La hora de inicio debe ser menor a la hora de fin' });
            }
        }

        const evento = await Evento.findByIdAndUpdate(id, datosActualizables, { new: true, runValidators: true })
            .populate('sucursal', 'nombre')
            .populate('organizador', 'nombre');

        if (!evento) {
            return res.status(404).json({ success: false, message: 'Evento no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Evento actualizado correctamente', data: evento });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el evento', error: error.message });
    }
};

export const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;

        const evento = await Evento.findByIdAndUpdate(id, { estado: 'CANCELADO' }, { new: true });

        if (!evento) {
            return res.status(404).json({ success: false, message: 'Evento no encontrado' });
        }

        res.status(200).json({ success: true, message: `Evento "${evento.nombre}" cancelado`, data: evento });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cancelar el evento', error: error.message });
    }
};
