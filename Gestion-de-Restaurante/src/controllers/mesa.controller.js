import Mesa from '../models/mesa.model.js';
import Sucursal from '../models/sucursal.model.js';

export const createMesa = async (req, res) => {
    try {
        const { numero, capacidad, sucursal } = req.body;

        const sucursalExiste = await Sucursal.findOne({ _id: sucursal, estado: true });
        if (!sucursalExiste) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        const mesaExiste = await Mesa.findOne({ numero, sucursal, estado: true });
        if (mesaExiste) {
            return res.status(400).json({ success: false, message: `La mesa número ${numero} ya existe en esta sucursal` });
        }

        const mesa = new Mesa({ numero, capacidad, sucursal });
        await mesa.save();

        res.status(201).json({ success: true, message: 'Mesa creada correctamente', data: mesa });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la mesa', error: error.message });
    }
};

export const getMesas = async (req, res) => {
    try {
        const mesas = await Mesa.find({ estado: true })
            .populate('sucursal', 'nombre direccion');

        res.status(200).json({ success: true, total: mesas.length, data: mesas });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las mesas', error: error.message });
    }
};

export const getMesaById = async (req, res) => {
    try {
        const { id } = req.params;

        const mesa = await Mesa.findOne({ _id: id, estado: true })
            .populate('sucursal', 'nombre direccion');

        if (!mesa) {
            return res.status(404).json({ success: false, message: 'Mesa no encontrada' });
        }

        res.status(200).json({ success: true, data: mesa });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la mesa', error: error.message });
    }
};

export const getMesasBySucursal = async (req, res) => {
    try {
        const { sucursalId } = req.params;
        const { disponible } = req.query;

        const filtro = { sucursal: sucursalId, estado: true };
        if (disponible !== undefined) filtro.disponible = disponible === 'true';

        const mesas = await Mesa.find(filtro).sort({ numero: 1 });

        res.status(200).json({ success: true, total: mesas.length, data: mesas });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las mesas', error: error.message });
    }
};

export const updateMesa = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, ...datosActualizables } = req.body;

        const mesa = await Mesa.findOneAndUpdate(
            { _id: id, estado: true },
            datosActualizables,
            { new: true, runValidators: true }
        ).populate('sucursal', 'nombre');

        if (!mesa) {
            return res.status(404).json({ success: false, message: 'Mesa no encontrada' });
        }

        res.status(200).json({ success: true, message: 'Mesa actualizada correctamente', data: mesa });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Ya existe una mesa con ese número en la sucursal' });
        }
        res.status(500).json({ success: false, message: 'Error al actualizar la mesa', error: error.message });
    }
};

export const deleteMesa = async (req, res) => {
    try {
        const { id } = req.params;

        const mesa = await Mesa.findByIdAndUpdate(id, { estado: false }, { new: true });

        if (!mesa) {
            return res.status(404).json({ success: false, message: 'Mesa no encontrada' });
        }

        res.status(200).json({ success: true, message: `Mesa número ${mesa.numero} eliminada`, data: mesa });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar la mesa', error: error.message });
    }
};
