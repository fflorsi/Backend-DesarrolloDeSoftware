import { Router } from "express";
import { add, findAll, findOne, remove, sanitizeVaccineInput, update } from "./vaccine.controler";

export const vaccineRouter = Router()

vaccineRouter.get('/', findAll)
vaccineRouter.get('/:id', findOne)
vaccineRouter.post('/',sanitizeVaccineInput, add)
vaccineRouter.put('/:id',sanitizeVaccineInput, update)
vaccineRouter.patch('/:id',sanitizeVaccineInput, update)
vaccineRouter.delete('/:id', remove)