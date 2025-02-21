import { Router } from 'express';
import { getAppointmentsByProfessional, getMonthlyEarnings, getMonthlySpending, getMostActiveProfessionals, getMostAttendedFacilities, getMostAttendedPets, getMostRequestedServices, getMostSoldProducts, getMostUsedFacilitiesByClient, getRegisteredClientsAndPets} from './report.controler';

export const reportRouter = Router();

reportRouter.get('/monthly-earnings', getMonthlyEarnings);
reportRouter.get('/mostRequestedServices', getMostRequestedServices);
reportRouter.get('/mostSoldProducts', getMostSoldProducts);
reportRouter.get('/registeredClientsAndPets', getRegisteredClientsAndPets);
reportRouter.get('/mostActiveProfessionals', getMostActiveProfessionals);
reportRouter.get('/appointmentsByProfessional/:professionalId', getAppointmentsByProfessional);
reportRouter.get('/mostAttendedFacilities/:professionalId', getMostAttendedFacilities);
reportRouter.get('/monthlySpending/:clientId', getMonthlySpending);
reportRouter.get('/mostUsedFacilitiesByClient/:clientId', getMostUsedFacilitiesByClient);
reportRouter.get('/mostAttendedPets/:clientId', getMostAttendedPets);
