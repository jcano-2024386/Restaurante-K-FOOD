import { Schema, model } from 'mongoose';

const categoriaSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre de la categoría es obligatorio'],
            trim: true
        },
        descripcion: {
            type: String,
            trim: true,
            default: ''
        },
        restaurante: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurante',
            required: [true, 'El restaurante es obligatorio']
        },
        estado: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default model('Categoria', categoriaSchema);
