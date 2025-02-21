import { Router } from "express";
import { createOrder, success, failure, pending, webhook } from "./payment.controler";

export const paymentRouter = Router()

paymentRouter.post("/create", createOrder)
paymentRouter.get("/success", success)
paymentRouter.get("/failure", failure)
paymentRouter.get("/pending", pending)
paymentRouter.post("/webhook", webhook)