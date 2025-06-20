import {Router} from 'express'
import {getTimeToken, login, saveUser, updateToken, getAllUsers, getUserByUserbane, updateUser, deleteUser, saveProduct, getProducts, getProductById, updateProduct,deleteProduct
    , createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder
 } from "../controllers/auth.controllers"

const router = Router();

router.post('/login-user', login);
router.get('/getTime/:userId', getTimeToken);
router.patch('/update/:userId', updateToken);
router.get('/users', getAllUsers);
router.get('/users/name/:userName', getUserByUserbane);
router.post('/users', saveUser);
router.patch('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);
router.post('/producto', saveProduct);
router.get('/producto', getProducts);
router.get('/producto/:id', getProductById);
router.put('/producto/:id', updateProduct);
router.delete('/producto/:id', deleteProduct);
router.post('/orden', createOrder);
router.get('/orden', getAllOrders);
router.get('/orden/:id', getOrderById);
router.put('/orden/:id', updateOrder);
router.delete('/orden/:id', deleteOrder);

export default router;