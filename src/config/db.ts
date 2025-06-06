import mongoose from "mongoose";

const connectDBMongo= async ():Promise<void>=> {
    const mongoUrl="mongodb://localhost:27017/user"; // mi ruta del mongo

    try{
        await mongoose.connect(mongoUrl);
        console.log("conexion con mongo")
    }catch (error){
        console.log("Error al conectarse con mongo: ", error);
    }
}
export default connectDBMongo;