import { Router } from "express";
import { createOrder, savePayment} from "./payment.controler.js";

export const paymentRouter = Router()

paymentRouter.post("/create", createOrder)
paymentRouter.get("/save/:paymentId", savePayment)