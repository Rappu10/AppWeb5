import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import connectDBMongo from './config/db';
 
const app = express();    //declarando un objeto del servidor

const PORT = 3000;   //numero de puerto (tiene que estar disponibles)

app.use(express.json())     //request de tipo json
app.use(morgan('dev'));     //agraga logs de peticiones

//ruta principal
app.use('/api/auth', authRoutes);

connectDBMongo().then(() => {
    app.listen(PORT, () => {
        console.log("El servidor está corriendo en el puerto: ", {PORT});
    });
}).catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
});