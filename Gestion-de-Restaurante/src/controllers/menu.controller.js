import Menu from '../models/menu.model.js';
import Categoria from '../models/categoria.model.js';
import Restaurante from '../models/restaurantes.model.js';

export const createMenu = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, restaurante, disponible } = req.body;

        const restauranteExiste = await Restaurante.findOne({ _id: restaurante, estado: true });
        if (!restauranteExiste) {
            return res.status(404).json({ success: false, message: 'Restaurante no encontrado' });
        }

        const categoriaExiste = await Categoria.findOne({ _id: categoria, estado: true });
        if (!categoriaExiste) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        const menu = new Menu({ nombre, descripcion, precio, categoria, restaurante, disponible });
        await menu.save();

        res.status(201).json({ success: true, message: 'Platillo creado correctamente', data: menu });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el platillo', error: error.message });
    }
};

export const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find({ estado: true })
            .populate('categoria', 'nombre')
            .populate('restaurante', 'nombre');

        res.status(200).json({ success: true, total: menus.length, data: menus });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el menú', error: error.message });
    }
};

export const getMenuById = async (req, res) => {
    try {
        const { id } = req.params;

        const menu = await Menu.findOne({ _id: id, estado: true })
            .populate('categoria', 'nombre')
            .populate('restaurante', 'nombre');

        if (!menu) {
            return res.status(404).json({ success: false, message: 'Platillo no encontrado' });
        }

        res.status(200).json({ success: true, data: menu });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el platillo', error: error.message });
    }
};

export const getMenusByRestaurante = async (req, res) => {
    try {
        const { restauranteId } = req.params;
        const { disponible } = req.query;

        const filtro = { restaurante: restauranteId, estado: true };
        if (disponible !== undefined) filtro.disponible = disponible === 'true';

        const menus = await Menu.find(filtro)
            .populate('categoria', 'nombre')
            .sort({ categoria: 1, nombre: 1 });

        res.status(200).json({ success: true, total: menus.length, data: menus });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el menú', error: error.message });
    }
};

export const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, restaurante, ...datosActualizables } = req.body;

        const menu = await Menu.findOneAndUpdate(
            { _id: id, estado: true },
            datosActualizables,
            { new: true, runValidators: true }
        ).populate('categoria', 'nombre');

        if (!menu) {
            return res.status(404).json({ success: false, message: 'Platillo no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Platillo actualizado correctamente', data: menu });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el platillo', error: error.message });
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const menu = await Menu.findByIdAndUpdate(id, { estado: false }, { new: true });

        if (!menu) {
            return res.status(404).json({ success: false, message: 'Platillo no encontrado' });
        }

        res.status(200).json({ success: true, message: `Platillo "${menu.nombre}" eliminado`, data: menu });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el platillo', error: error.message });
    }
};
