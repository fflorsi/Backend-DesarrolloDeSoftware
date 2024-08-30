import { Router } from 'express';
import { sanitizeMedicalHistoryInput, findAll, findOne, add, update, remove } from "./medicalHistory.controler.js";

export const medicalHistoryRouter = Router()

medicalHistoryRouter.get('/',findAll)
medicalHistoryRouter.get('/:id', findOne)
medicalHistoryRouter.post('/', sanitizeMedicalHistoryInput, add)
medicalHistoryRouter.put('/:id', sanitizeMedicalHistoryInput, update)
medicalHistoryRouter.patch('/:id', sanitizeMedicalHistoryInput, update)
medicalHistoryRouter.delete('/:id', remove)