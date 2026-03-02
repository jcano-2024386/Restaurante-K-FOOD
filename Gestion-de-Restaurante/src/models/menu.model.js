import { Schema, model } from 'mongoose';

const menuSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del platillo es obligatorio'],
            trim: true
        },
        descripcion: {
            type: String,
            trim: true,
            default: ''
        },
        precio: {
            type: Number,
            required: [true, 'El precio es obligatorio'],
            min: [0, 'El precio no puede ser negativo']
        },
        categoria: {
            type: Schema.Types.ObjectId,
            ref: 'Categoria',
            required: [true, 'La categoría es obligatoria']
        },
        restaurante: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurante',
            required: [true, 'El restaurante es obligatorio']
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

export default model('Menu', menuSchema);
