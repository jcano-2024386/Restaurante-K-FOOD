import Categoria from '../models/categoria.model.js';
import Restaurante from '../models/restaurantes.model.js';

export const createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion, restaurante } = req.body;

        const restauranteExiste = await Restaurante.findOne({ _id: restaurante, estado: true });
        if (!restauranteExiste) {
            return res.status(404).json({ success: false, message: 'Restaurante no encontrado' });
        }

        const categoria = new Categoria({ nombre, descripcion, restaurante });
        await categoria.save();

        res.status(201).json({ success: true, message: 'Categoría creada correctamente', data: categoria });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la categoría', error: error.message });
    }
};

export const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find({ estado: true })
            .populate('restaurante', 'nombre');

        res.status(200).json({ success: true, total: categorias.length, data: categorias });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las categorías', error: error.message });
    }
};

export const getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findOne({ _id: id, estado: true })
            .populate('restaurante', 'nombre');

        if (!categoria) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        res.status(200).json({ success: true, data: categoria });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la categoría', error: error.message });
    }
};

export const getCategoriasByRestaurante = async (req, res) => {
    try {
        const { restauranteId } = req.params;

        const categorias = await Categoria.find({ restaurante: restauranteId, estado: true });

        res.status(200).json({ success: true, total: categorias.length, data: categorias });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las categorías', error: error.message });
    }
};

export const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, restaurante, ...datosActualizables } = req.body;

        const categoria = await Categoria.findOneAndUpdate(
            { _id: id, estado: true },
            datosActualizables,
            { new: true, runValidators: true }
        );

        if (!categoria) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        res.status(200).json({ success: true, message: 'Categoría actualizada correctamente', data: categoria });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar la categoría', error: error.message });
    }
};

export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

        if (!categoria) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        res.status(200).json({ success: true, message: `Categoría "${categoria.nombre}" eliminada`, data: categoria });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar la categoría', error: error.message });
    }
};
