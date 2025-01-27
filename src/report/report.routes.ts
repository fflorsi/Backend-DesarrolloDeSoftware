import { Router } from 'express';
import { getMonthlyEarnings, getMostRequestedServices } from './report.controler.js';

export const reportRouter = Router();

reportRouter.get('/monthly-earnings', getMonthlyEarnings);
reportRouter.get('/mostRequestedServices', getMostRequestedServices);
