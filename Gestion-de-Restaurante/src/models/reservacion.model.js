import { Schema, model } from 'mongoose';

const reservacionSchema = new Schema(
    {
        cliente: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: [true, 'El cliente es obligatorio']
        },
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
        fecha: {
            type: Date,
            required: [true, 'La fecha es obligatoria']
        },
        hora: {
            type: String,
            required: [true, 'La hora es obligatoria'],
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido (HH:MM)']
        },
        numeroPersonas: {
            type: Number,
            required: [true, 'El número de personas es obligatorio'],
            min: [1, 'Debe ser al menos 1 persona']
        },
        observaciones: {
            type: String,
            trim: true,
            default: ''
        },
        estado: {
            type: String,
            enum: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA'],
            default: 'PENDIENTE'
        }
    },
    { timestamps: true }
);

export default model('Reservacion', reservacionSchema);
