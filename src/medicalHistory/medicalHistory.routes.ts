import { Router } from 'express';
import { sanitizeMedicalHistoryInput, findAll, findOne, add, update, remove, findByPetId, addVaccineToMedicalHistory } from "./medicalHistory.controler.js";

export const medicalHistoryRouter = Router()

medicalHistoryRouter.get('/',findAll)
//medicalHistoryRouter.get('/:id', findOne)
medicalHistoryRouter.get('/:id', findByPetId)
medicalHistoryRouter.post('/', sanitizeMedicalHistoryInput, add)
medicalHistoryRouter.put('/:id', sanitizeMedicalHistoryInput, update)
medicalHistoryRouter.patch('/:id', sanitizeMedicalHistoryInput, update)
medicalHistoryRouter.delete('/:id', remove)
medicalHistoryRouter.post('/:id/vaccines', addVaccineToMedicalHistory);