import {Router} from 'express'
import {getTimeToken, login, saveUser, updateToken, getAllUsers, getUserByUserbane, updateUser, deleteUser } from "../controllers/auth.controllers"

const router = Router();

router.post('/login-user', login);
router.get('/getTime/:userId', getTimeToken);
router.patch('/update/:userId', updateToken);
router.get('/users', getAllUsers);
router.get('/users/name/:userName', getUserByUserbane);
router.post('/users', saveUser);
router.patch('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

export default router;