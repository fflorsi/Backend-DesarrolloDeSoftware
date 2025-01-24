import { Router } from "express";
import { createOrder, success, failure, pending } from "./payment.controler.js";

export const paymentRouter = Router()

paymentRouter.post("/create", createOrder)
paymentRouter.get("/success", success)
paymentRouter.get("/failure", failure)
paymentRouter.get("/pending", pending)
