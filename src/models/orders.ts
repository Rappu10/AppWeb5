import { model, Schema, Document, Types } from "mongoose";

export interface IOrden extends Document {
    usuario: Types.ObjectId;
    total: number;
    subtotal: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrdenSchema = new Schema<IOrden>({
    usuario: { 
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true 
    },
    total: { 
        type: Number,
        required: true,
        min: 0 
    },
    subtotal: { 
        type: Number,
        required: true,
        min: 0 
    },
    status: { 
        type: String,
        enum: ['pendiente', 'completada', 'cancelada', 'en_proceso'],
        default: 'pendiente'
    }
}, {
    timestamps: { 
        createdAt: 'fechaDeCreacion',
        updatedAt: 'updateDate'
    },
    versionKey: false
});

export const Orden = model<IOrden>('Orden', OrdenSchema);