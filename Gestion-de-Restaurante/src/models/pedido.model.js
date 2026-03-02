import { Schema, model } from 'mongoose';

const detallePedidoSchema = new Schema(
    {
        menu: {
            type: Schema.Types.ObjectId,
            ref: 'Menu',
            required: [true, 'El platillo es obligatorio']
        },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad es obligatoria'],
            min: [1, 'La cantidad mínima es 1']
        },
        precioUnitario: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        }
    },
    { _id: false }
);

const pedidoSchema = new Schema(
    {
        mesa: {
            type: Schema.Types.ObjectId,
            ref: 'Mesa',
            required: [true, 'La mesa es obligatoria']
        },
        sucursal: {
            type: Schema.Types.ObjectId,
            ref: 'Sucursal',
            required: [true, 'La sucursal es obligatoria']
        },
        mesero: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: [true, 'El mesero es obligatorio']
        },
        detalles: {
            type: [detallePedidoSchema],
            validate: {
                validator: (v) => v.length > 0,
                message: 'El pedido debe tener al menos un producto'
            }
        },
        total: {
            type: Number,
            required: true,
            min: [0, 'El total no puede ser negativo']
        },
        estado: {
            type: String,
            enum: ['PENDIENTE', 'EN_PROCESO', 'LISTO', 'ENTREGADO', 'CANCELADO'],
            default: 'PENDIENTE'
        },
        observaciones: {
            type: String,
            trim: true,
            default: ''
        }
    },
    { timestamps: true }
);

export default model('Pedido', pedidoSchema);
