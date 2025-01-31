import { Router } from "express";
import { createOrder,getAllOrders, getAllOrdersByClientId, getMonthlyEarnings, getMonthlyEarningsByClientId, getOrderById } from "./oder.controler.js";

export const orderRouter = Router()
orderRouter.get('/monthly-earnings',getMonthlyEarnings)
orderRouter.post('/', createOrder)
orderRouter.get('/',getAllOrders)
orderRouter.get('/:id',getOrderById)
orderRouter.get('/clientorders/:clientId', getAllOrdersByClientId)
orderRouter.get('/clientearnings/:clientId', getMonthlyEarningsByClientId)
