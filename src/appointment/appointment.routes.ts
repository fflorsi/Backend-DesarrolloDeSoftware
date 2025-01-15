import express from 'express';
import { Router } from 'express'

import {
  createAppointment,
  updateAppointmentState,
  getAppointmentsByState,
  getAllAppointmentsWithDetails,
  getFutureAppointmentsWithDetails,
  getFutureAppointmentsWithDetailsByClientId
} from '../appointment/appointment.controler.js'; // Importa las funciones del controlador

export const appointmentRouter = Router();

// Ruta para crear un nuevo turno
appointmentRouter.post('/', createAppointment);

// Ruta para actualizar el estado de un turno
appointmentRouter.put('/:id', updateAppointmentState);

// Ruta para listar los turnos futuros
//appointmentRouter.get('/future', getFutureAppointments);

// Ruta para listar todos los turnos
//appointmentRouter.get('/', getAllAppointments);

// Ruta para listar turnos por estado
appointmentRouter.get('/state/:state', getAppointmentsByState);

appointmentRouter.get('/', getAllAppointmentsWithDetails);

// Ruta para obtener los turnos futuros con detalles
appointmentRouter.get('/future', getFutureAppointmentsWithDetails);

appointmentRouter.get('/future/:clientId',getFutureAppointmentsWithDetailsByClientId)

