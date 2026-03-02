import { Schema, model } from 'mongoose';

const eventoSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del evento es obligatorio'],
            trim: true
        },
        descripcion: {
            type: String,
            trim: true,
            default: ''
        },
        fecha: {
            type: Date,
            required: [true, 'La fecha del evento es obligatoria']
        },
        horaInicio: {
            type: String,
            required: [true, 'La hora de inicio es obligatoria'],
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido (HH:MM)']
        },
        horaFin: {
            type: String,
            required: [true, 'La hora de fin es obligatoria'],
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido (HH:MM)']
        },
        capacidadMaxima: {
            type: Number,
            required: [true, 'La capacidad máxima es obligatoria'],
            min: [1, 'La capacidad debe ser mayor a 0']
        },
        precioEntrada: {
            type: Number,
            default: 0,
            min: [0, 'El precio no puede ser negativo']
        },
        sucursal: {
            type: Schema.Types.ObjectId,
            ref: 'Sucursal',
            required: [true, 'La sucursal es obligatoria']
        },
        organizador: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: [true, 'El organizador es obligatorio']
        },
        estado: {
            type: String,
            enum: ['PROGRAMADO', 'EN_CURSO', 'FINALIZADO', 'CANCELADO'],
            default: 'PROGRAMADO'
        }
    },
    { timestamps: true }
);

export default model('Evento', eventoSchema);
