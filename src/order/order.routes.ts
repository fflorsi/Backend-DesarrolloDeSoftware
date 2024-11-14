import { Router } from "express";
import { createOrder,getAllOrders, getOrderById } from "./oder.controler";

export const orderRouter = Router()

orderRouter.post('/', createOrder)
orderRouter.get('/',getAllOrders)
orderRouter.get('/:id',getOrderById)