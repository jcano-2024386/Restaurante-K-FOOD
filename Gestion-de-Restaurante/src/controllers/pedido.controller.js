import Pedido from '../models/pedido.model.js';
import Mesa from '../models/mesa.model.js';
import Menu from '../models/menu.model.js';

export const createPedido = async (req, res) => {
    try {
        const { mesa, sucursal, detalles, observaciones } = req.body;

        // Verificar que la mesa exista y esté disponible
        const mesaExiste = await Mesa.findOne({ _id: mesa, estado: true });
        if (!mesaExiste) {
            return res.status(404).json({ success: false, message: 'Mesa no encontrada' });
        }
        if (!mesaExiste.disponible) {
            return res.status(400).json({ success: false, message: 'La mesa no está disponible' });
        }

        // Calcular subtotales y total
        let total = 0;
        const detallesCalculados = [];

        for (const detalle of detalles) {
            const platillo = await Menu.findOne({ _id: detalle.menu, estado: true, disponible: true });
            if (!platillo) {
                return res.status(404).json({ success: false, message: `Platillo con ID ${detalle.menu} no encontrado o no disponible` });
            }
            const subtotal = platillo.precio * detalle.cantidad;
            total += subtotal;
            detallesCalculados.push({
                menu: platillo._id,
                cantidad: detalle.cantidad,
                precioUnitario: platillo.precio,
                subtotal
            });
        }

        const pedido = new Pedido({
            mesa,
            sucursal,
            mesero: req.user.id,
            detalles: detallesCalculados,
            total,
            observaciones
        });

        await pedido.save();

        // Marcar la mesa como ocupada
        await Mesa.findByIdAndUpdate(mesa, { disponible: false });

        res.status(201).json({ success: true, message: 'Pedido creado correctamente', data: pedido });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el pedido', error: error.message });
    }
};

export const getPedidos = async (req, res) => {
    try {
        const { estado } = req.query;
        const filtro = estado ? { estado } : {};

        const pedidos = await Pedido.find(filtro)
            .populate('mesa', 'numero')
            .populate('sucursal', 'nombre')
            .populate('mesero', 'nombre username')
            .populate('detalles.menu', 'nombre precio')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, total: pedidos.length, data: pedidos });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los pedidos', error: error.message });
    }
};

export const getPedidoById = async (req, res) => {
    try {
        const { id } = req.params;

        const pedido = await Pedido.findById(id)
            .populate('mesa', 'numero capacidad')
            .populate('sucursal', 'nombre direccion')
            .populate('mesero', 'nombre username')
            .populate('detalles.menu', 'nombre precio descripcion');

        if (!pedido) {
            return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        res.status(200).json({ success: true, data: pedido });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el pedido', error: error.message });
    }
};

export const updateEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const estadosValidos = ['PENDIENTE', 'EN_PROCESO', 'LISTO', 'ENTREGADO', 'CANCELADO'];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ success: false, message: `Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}` });
        }

        const pedido = await Pedido.findByIdAndUpdate(id, { estado }, { new: true })
            .populate('mesa', 'numero')
            .populate('mesero', 'nombre');

        if (!pedido) {
            return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        // Si el pedido fue entregado o cancelado, liberar la mesa
        if (estado === 'ENTREGADO' || estado === 'CANCELADO') {
            await Mesa.findByIdAndUpdate(pedido.mesa._id, { disponible: true });
        }

        res.status(200).json({ success: true, message: `Estado del pedido actualizado a "${estado}"`, data: pedido });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el estado del pedido', error: error.message });
    }
};

export const getPedidosBySucursal = async (req, res) => {
    try {
        const { sucursalId } = req.params;
        const { estado } = req.query;

        const filtro = { sucursal: sucursalId };
        if (estado) filtro.estado = estado;

        const pedidos = await Pedido.find(filtro)
            .populate('mesa', 'numero')
            .populate('mesero', 'nombre')
            .populate('detalles.menu', 'nombre precio')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, total: pedidos.length, data: pedidos });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los pedidos', error: error.message });
    }
};
