import { model, Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
    userId: string;
    total: number;
    subtotal: number;
    products: IOrderProduct[];
    createDate: Date;
    updateDate: Date;
}

export interface IOrderProduct extends Document {
    productId: Types.ObjectId;
    name: string;
    price: number;
    status: boolean;
    description: string;
    quantity: number;
    createDate: Date;
    deleteDate: Date | null;
}

const orderProductSchema = new Schema<IOrderProduct>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date,
        default: null
    }
}, { _id: false });

const orderSchema = new Schema<IOrder>({
    userId: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    products: {
        type: [orderProductSchema],
        required: true,
        validate: {
            validator: (array: any[]) => array.length > 0,
            message: 'The order must contain at least one product'
        }
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});

export const Order = model<IOrder>('Order', orderSchema);
