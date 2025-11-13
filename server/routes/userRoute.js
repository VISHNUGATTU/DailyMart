import express from 'express';
import { isAuth, login, logout, registerUser,getProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

// Use actual controller function
userRouter.post('/register', registerUser);
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.get('/logout', logout); // 👌 no auth middleware
userRouter.get('/profile', authUser,getProfile);


export default userRouter;
