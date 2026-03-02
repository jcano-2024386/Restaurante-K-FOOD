import { Schema, model } from 'mongoose';

const mesaSchema = new Schema(
    {
        numero: {
            type: Number,
            required: [true, 'El número de mesa es obligatorio'],
            min: [1, 'El número de mesa debe ser mayor a 0']
        },
        capacidad: {
            type: Number,
            required: [true, 'La capacidad es obligatoria'],
            min: [1, 'La capacidad debe ser al menos 1']
        },
        sucursal: {
            type: Schema.Types.ObjectId,
            ref: 'Sucursal',
            required: [true, 'La sucursal es obligatoria']
        },
        disponible: {
            type: Boolean,
            default: true
        },
        estado: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

// Evitar mesas con el mismo número en la misma sucursal
mesaSchema.index({ numero: 1, sucursal: 1 }, { unique: true });

export default model('Mesa', mesaSchema);
