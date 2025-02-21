import { Router} from "express";
import {createAdminUser, createProfessionalUser, fetchUserProfile, getUserByUsername, loginUser, newUser, updatePassword, updateUsername} from './user.controler';
import { verifyRole } from "../middlewares/auth.middleware";

export const userRouter = Router()

userRouter.post('/',newUser)
userRouter.post('/login',loginUser)
userRouter.post('/pro',createProfessionalUser)
userRouter.get('/profile', verifyRole, fetchUserProfile);
userRouter.get('/getbyusername', getUserByUsername)
userRouter.post('/updateusername/:id', updateUsername);
userRouter.post('/updatepassword/:id', updatePassword);
userRouter.post('/adm',createAdminUser)