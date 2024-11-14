import { Router } from "express";
import { sanitizeFacilityInput, findAll, findOne, add, update, remove, searchByName} from './facility.controler.js'

export const facilityRouter = Router()

facilityRouter.get('/', findAll)
facilityRouter.get('/:id', findOne)
facilityRouter.post('/',sanitizeFacilityInput, add)
facilityRouter.put('/:id', sanitizeFacilityInput, update)
facilityRouter.delete('/:id', remove)
facilityRouter.get('/search', searchByName);