import { Router } from "express";
import { sanitizeFacilityInput, findAll, findOne, add, update, remove} from './facility.controler.js'

export const facilityRouter = Router()

facilityRouter.get('/', findAll)
facilityRouter.get('/:id', findOne)
facilityRouter.post('/', add)
facilityRouter.put('/:id', sanitizeFacilityInput, update)
facilityRouter.delete('/:id', remove)