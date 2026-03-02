import { Schema, model } from 'mongoose';

const sucursalSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre de la sucursal es obligatorio'],
            trim: true
        },
        direccion: {
            type: String,
            required: [true, 'La dirección es obligatoria'],
            trim: true
        },
        telefono: {
            type: String,
            trim: true,
            match: [/^\d{8}$/, 'El teléfono debe tener 8 dígitos']
        },
        restaurante: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurante',
            required: [true, 'El restaurante es obligatorio']
        },
        gerente: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            default: null
        },
        estado: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default model('Sucursal', sucursalSchema);
