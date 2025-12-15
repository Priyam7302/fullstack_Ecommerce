import { Router } from 'express';
import {  loginUser,getUsers, registerUser, deleteUser, updateUser } from '../controllers/Auth.js'

const authRouter = Router();

authRouter.get('/', getUsers);
authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);
authRouter.delete('/:id', deleteUser);
authRouter.put('/:id', updateUser);


export default authRouter;