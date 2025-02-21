import { Router } from "express";
import { sanitizeFacilityInput, findAll, findOne, add, update, remove, searchByName} from './facility.controler'

export const facilityRouter = Router()

facilityRouter.get('/search', searchByName);
facilityRouter.get('/', findAll)
facilityRouter.get('/:id', findOne)
facilityRouter.post('/',sanitizeFacilityInput, add)
facilityRouter.put('/:id', sanitizeFacilityInput, update)
facilityRouter.delete('/:id', remove)
