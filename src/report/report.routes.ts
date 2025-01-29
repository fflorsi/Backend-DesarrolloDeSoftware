import { Router } from 'express';
import { getAppointmentsByProfessional, getMonthlyEarnings, getMostActiveProfessionals, getMostAttendedFacilities, getMostRequestedServices, getMostSoldProducts, getRegisteredClientsAndPets} from './report.controler.js';

export const reportRouter = Router();

reportRouter.get('/monthly-earnings', getMonthlyEarnings);
reportRouter.get('/mostRequestedServices', getMostRequestedServices);
reportRouter.get('/mostSoldProducts', getMostSoldProducts);
reportRouter.get('/registeredClientsAndPets', getRegisteredClientsAndPets);
reportRouter.get('/mostActiveProfessionals', getMostActiveProfessionals);
reportRouter.get('/appointmentsByProfessional/:professionalId', getAppointmentsByProfessional);
reportRouter.get('/mostAttendedFacilities/:professionalId', getMostAttendedFacilities);
