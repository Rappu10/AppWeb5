import {Request, Response} from 'express'
import { generateAccesToken } from '../utils/generateToken';
import { cache } from '../utils/cache';
import dayjs from 'dayjs';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import { Order } from '../models/order';
import { Product } from '../models/productos';


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

export const saveProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description, quantity, status } = req.body;

        if (!name || !price || !description || !quantity) {
            return res.status(400).json({ 
                message: "Nombre, precio, descripción y cantidad son campos requeridos" 
            });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            quantity,
            status: status !== undefined ? status : true,
            createDate: new Date(),
            deleteDate: null
        });

        const product = await newProduct.save();

        return res.json({ 
            message: "Producto creado exitosamente",
            product 
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ deleteDate: null });
        return res.json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.deleteDate) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.json(product);
    } catch (error) {
        console.error("Error al obtener producto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updates = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (!product || product.deleteDate) {
            return res.status(404).json({ message: "Producto no encontrado o eliminado" });
        }

        return res.json({ message: "Producto actualizado correctamente", product });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { deleteDate: new Date(), status: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.json({ message: "Producto eliminado lógicamente", product });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, total, subtotal, products } = req.body;

        if (!userId || !total || !subtotal || !products || products.length === 0) {
            return res.status(400).json({
                message: "userId, total, subtotal and at least one product are required"
            });
        }

        const newOrder = new Order({
            userId,
            total,
            subtotal,
            products,
            createDate: new Date(),
            updateDate: new Date()
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json({
            message: "Order created successfully",
            order: savedOrder
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        return res.json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.json(order);
    } catch (error) {
        console.error("Error retrieving order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const updates = { ...req.body, updateDate: new Date() };
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.json({
            message: "Order updated successfully",
            order: updatedOrder
        });
    } catch (error) {
        console.error("Error updating order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { updateDate: new Date(), deleteDate: new Date() },
            { new: true }
        );

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.json({
            message: "Order deleted logically",
            order: deletedOrder
        });
    } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};