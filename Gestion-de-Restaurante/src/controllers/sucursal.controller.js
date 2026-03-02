import Sucursal from '../models/sucursal.model.js';
import Restaurante from '../models/restaurantes.model.js';

export const createSucursal = async (req, res) => {
    try {
        const { nombre, direccion, telefono, restaurante, gerente } = req.body;

        const restauranteExiste = await Restaurante.findOne({ _id: restaurante, estado: true });
        if (!restauranteExiste) {
            return res.status(404).json({ success: false, message: 'Restaurante no encontrado' });
        }

        const sucursal = new Sucursal({ nombre, direccion, telefono, restaurante, gerente });
        await sucursal.save();

        res.status(201).json({
            success: true,
            message: 'Sucursal creada correctamente',
            data: sucursal
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la sucursal', error: error.message });
    }
};

export const getSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.find({ estado: true })
            .populate('restaurante', 'nombre direccion')
            .populate('gerente', 'nombre email');

        res.status(200).json({ success: true, total: sucursales.length, data: sucursales });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las sucursales', error: error.message });
    }
};

export const getSucursalById = async (req, res) => {
    try {
        const { id } = req.params;

        const sucursal = await Sucursal.findOne({ _id: id, estado: true })
            .populate('restaurante', 'nombre direccion')
            .populate('gerente', 'nombre email');

        if (!sucursal) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        res.status(200).json({ success: true, data: sucursal });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la sucursal', error: error.message });
    }
};

export const getSucursalesByRestaurante = async (req, res) => {
    try {
        const { restauranteId } = req.params;

        const sucursales = await Sucursal.find({ restaurante: restauranteId, estado: true })
            .populate('gerente', 'nombre email');

        res.status(200).json({ success: true, total: sucursales.length, data: sucursales });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las sucursales', error: error.message });
    }
};

export const updateSucursal = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, restaurante, ...datosActualizables } = req.body;

        const sucursal = await Sucursal.findOneAndUpdate(
            { _id: id, estado: true },
            datosActualizables,
            { new: true, runValidators: true }
        ).populate('restaurante', 'nombre').populate('gerente', 'nombre email');

        if (!sucursal) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        res.status(200).json({ success: true, message: 'Sucursal actualizada correctamente', data: sucursal });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar la sucursal', error: error.message });
    }
};

export const deleteSucursal = async (req, res) => {
    try {
        const { id } = req.params;

        const sucursal = await Sucursal.findByIdAndUpdate(id, { estado: false }, { new: true });

        if (!sucursal) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        res.status(200).json({ success: true, message: `Sucursal "${sucursal.nombre}" eliminada`, data: sucursal });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar la sucursal', error: error.message });
    }
};
