import { Router } from "express";
import { findAll, sanitizeObservationInput, findOne, add, update, remove } from "./observations.controler.js";

export const observationRouter = Router()

observationRouter.get('/', findAll)
observationRouter.get('/:id', findOne)
observationRouter.post('/',sanitizeObservationInput, add)
observationRouter.put('/:id',sanitizeObservationInput, update)
observationRouter.patch('/:id',sanitizeObservationInput, update)
observationRouter.delete('/:id', remove)