import { Router } from "express";
import { getAllOrders, getAllOrdersByClientId, getMonthlyEarnings, getMonthlyEarningsByClientId, getOrderById, getOrderByPaymentId } from "./oder.controler.js";

export const orderRouter = Router()
orderRouter.get('/monthly-earnings',getMonthlyEarnings)
orderRouter.get('/',getAllOrders)
orderRouter.get('/:id',getOrderById)
orderRouter.get('/clientorders/:clientId', getAllOrdersByClientId)
orderRouter.get('/clientearnings/:clientId', getMonthlyEarningsByClientId)
orderRouter.get('/detailbypaymentid/:paymentId', getOrderByPaymentId)