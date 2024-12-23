import { Router} from "express";
import {createProfessionalUser, fetchUserProfile, loginUser, newUser} from './user.controler.js';
import { verifyRole } from "../middlewares/auth.middleware.js";

export const userRouter = Router()

userRouter.post('/',newUser)
userRouter.post('/login',loginUser)
userRouter.post('/pro',createProfessionalUser)
userRouter.get('/profile', verifyRole, fetchUserProfile);

