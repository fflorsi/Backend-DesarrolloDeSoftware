import { Router } from 'express';
import { getMonthlyEarnings, getMostActiveProfessionals, getMostRequestedServices, getMostSoldProducts, getRegisteredClientsAndPets} from './report.controler.js';

export const reportRouter = Router();

reportRouter.get('/monthly-earnings', getMonthlyEarnings);
reportRouter.get('/mostRequestedServices', getMostRequestedServices);
reportRouter.get('/mostSoldProducts', getMostSoldProducts);
reportRouter.get('/registeredClientsAndPets', getRegisteredClientsAndPets);
reportRouter.get('/mostActiveProfessionals', getMostActiveProfessionals);
