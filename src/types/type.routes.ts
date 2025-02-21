import { Router } from "express";
import { findAll, findOne } from "./type.controler";

export const typeRouter = Router()

typeRouter.get('/', findAll)
typeRouter.get('/:id', findOne)