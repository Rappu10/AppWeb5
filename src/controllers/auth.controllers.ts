import {Request, Response} from 'express'
import { generateAccesToken } from '../utils/generateToken';
import { cache } from '../utils/cache';
import dayjs from 'dayjs';
import { User } from '../models/user';
import bcrypt from 'bcrypt';


//endpoint recibe un request , responde un response
export const login = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    const user = await User.findOne({username});
    if (!user){
        return res.status(401).json({ message: "Credenciales Incorrectas" });
    }
    if (password !== user.password) {
        return res.status(401).json({ message: "Credenciales Incorrectas" });
    }

const userId="1234567"
    const accesToken=generateAccesToken(userId)

cache.set(userId,accesToken,60*15)
    return res.json({ 
        message: "login exitoso",
        accesToken })
;

}

export const getTimeToken=(req:Request,res:Response)=>{
    const {userId} = req.params;
    //const userId="1234567";
    const ttl = cache.getTtl(userId);

    if(!ttl) {
        return res.status(404).json({message:"Token no encontrado"});
    }

    const now = Date.now();
    const timeToLifeSecond = Math.floor((ttl-now)/1000);

    const expTime=dayjs(ttl).format("HH:mm:ss");

    return res.json({
        timeToLifeSecond,
        expTime
    })


}


export const updateToken=( req:Request, res:Response) => {
    const {userId} = req.params;
    //const userId="1234567";
    const ttl = cache.getTtl(userId);

    if(!ttl) {
        return res.status(404).json({message:"Token no encontrado"});
    }

    const newTime:number = 60*15;
    cache.ttl(userId,newTime);  //actualiza tiempo de vida del token


    return res.json({message: "Actualizado con exito"});
}

export const getAllUsers = async (req: Request, res: Response) => {
    const userList = await User.find();
    return res.json({ userList });
};

export const getUserByUserbane = async (req:Request,res:Response) =>{
    const {userName}=req.params;

    const userByUsername = await User.find({ username: userName });

    if (!userByUsername) {
        return res.status(404).json ({mensage: "Usuario no Existe"})
    }
    return res.json({userByUsername})
}

export const saveUser = async (req: Request, res: Response) => {
    try {
        const { fullName, username, email, phone, password, role } = req.body;

        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name: fullName,
            username: username,
            email,
            phone,
            password: hashedPassword,
            role,
            status: true
        });

        const user = await newUser.save();

        return res.json({ user });
    } catch (error) {
        console.log("Error Ocurrido en SAVE", error);
        return res.status(500).json({ message: "Error al guardar el usuario" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { emailUser, phone, password, role, name } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const existingUserWithEmail = await User.findOne({ email: emailUser });
        if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
            return res.status(426).json({
                message: "Correo ya está registrado por otro usuario"
            });
        }

        user.email = emailUser;
        user.phone = phone;
        user.role = role;
        user.name = name;

        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        return res.json({ updatedUser });
    } catch (error) {
        console.log("Error en updateUser:", error);
        return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
}

export const deleteUser=async(req:Request,res:Response)=>{
    const {userId} =req.params;
    const user = await User.findById(userId);

    if (!user){
        return res.status(404).json({message:"Usuario no encontrado"});
    }
    user.status=false;
    user.daleteDate=new Date;
    await user.save();

    return res.json({menssage:"Usuario eliminado"})
}