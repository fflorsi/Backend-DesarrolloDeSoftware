import { Router } from 'express'
import { sanitizeClientInput, findAll, findOne, add, update, remove, findClientAndPetsByDni, searchClientsByDNS } from './client.controler.js'

export const clientRouter = Router()

clientRouter.get('/search/:searchString',searchClientsByDNS);
clientRouter.get('/', findAll)
clientRouter.get('/:id', findOne)
clientRouter.post('/', sanitizeClientInput, add)
clientRouter.put('/:id', sanitizeClientInput, update)
clientRouter.delete('/:id', remove)
clientRouter.get('/by-dni/:dni', findClientAndPetsByDni);

