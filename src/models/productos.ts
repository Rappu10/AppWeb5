import { Document, Schema, model, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  status: boolean;
  description: string;
  quantity: number;
  createDate: Date;
  deleteDate: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  deleteDate: {
    type: Date,
  },
});

export const Product = model<IProduct>("product", productSchema);