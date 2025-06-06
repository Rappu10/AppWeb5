import { model, Schema, Document, Types } from "mongoose";

export interface IRole extends Document {
    type: string;
    name: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const RoleSchema = new Schema<IRole>({
    type: { 
        type: String,
        required: true,
        enum: ['admin', 'user', 'editor', 'guest'], 
        default: 'user'
    },
    name: { 
        type: String,
        required: true,
        unique: true 
    },
    status: { 
        type: Boolean, 
        default: true 
    }
}, {
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    versionKey: false
});

export const Role = model<IRole>('Role', RoleSchema);
