import { Document, model, Schema, Types } from "mongoose";

export interface IUser extends Document{
    name: string;
    _id: Types.ObjectId;
    username: string;
    password: string;
    email: string;
    role: string;
    phone: string
    status: boolean;
    createDate: Date;
    daleteDate: Date;
}
const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    role:{

    },
    phone:{
        type:String,
        required: true,
        unique: true
    },
    createDate:{
        type: Date,
        default: Date.now()
    },
    daleteDate:{
        type: Date,
    },
    status:{
        type:Boolean,
    }
    
});

export const User = model<IUser>('User', userSchema, 'user')