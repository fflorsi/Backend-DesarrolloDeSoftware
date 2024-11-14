import { Request, Response } from 'express';
import { Appointment } from '../appointment/appointment.model.js'
import { Op } from 'sequelize'; // Importa operadores de Sequelize
import { Pet } from '../pet/pet.model.js';
import { Professional } from '../professional/professional.model.js';
import { Facility } from '../facility/facility.model.js';

// Función para crear un nuevo turno
export const createAppointment = async (req: Request, res: Response): Promise<Response> => {
  const { petId, professionalId, facilityId, dateTime, state } = req.body;

  try {
    const newAppointment = await Appointment.create({
      petId,
      professionalId,
      facilityId,
      dateTime,
      state: state || 'scheduled',
    });

    return res.status(201).json({ message: 'Turno creado exitosamente', data: newAppointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el turno', error });
  }
};

// Función para actualizar el estado de un turno
export const updateAppointmentState = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { state } = req.body;

  if (!['received', 'cancelled'].includes(state)) {
    return res.status(400).json({ message: 'Estado inválido. Debe ser "received" o "cancelled".' });
  }

  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }

    appointment.state = state;
    await appointment.save();

    return res.status(200).json({ message: 'Estado del turno actualizado', data: appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el estado', error });
  }
};

// Función para listar turnos futuros
export const getFutureAppointments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const currentDate = new Date();

    const futureAppointments = await Appointment.findAll({
      where: {
        dateTime: {
          [Op.gt]: currentDate,
        },
      },
    });

    return res.status(200).json({ message: 'Turnos futuros', data: futureAppointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener turnos futuros', error });
  }
};

// Función para listar todos los turnos
export const getAllAppointments = async (req: Request, res: Response): Promise<Response> => {
  console.log("el rap del cp")
  try {
    const appointments = await Appointment.findAll();
    return res.status(200).json({ message: 'Todos los turnos', data: appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los turnos', error });
  }
};

// Función para filtrar turnos por estado
export const getAppointmentsByState = async (req: Request, res: Response): Promise<Response> => {
  const { state } = req.params;

  if (!['scheduled', 'received', 'cancelled'].includes(state)) {
    return res.status(400).json({ message: 'Estado inválido.' });
  }

  try {
    const appointments = await Appointment.findAll({
      where: {
        state: state,
      },
    });

    return res.status(200).json({ message: `Turnos con estado ${state}`, data: appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los turnos por estado', error });
  }
  
  
};

export const getAllAppointmentsWithDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await Appointment.findAll({
      group: ['Appointment.id'],  
      include: [
        { 
          model: Pet, 
          attributes: ['id', 'name']  // Limita los campos seleccionados
        },
        { 
          model: Professional, 
          attributes: ['id', 'firstname', 'lastname']  // Limita los campos seleccionados
        },
        { 
          model: Facility, 
          attributes: ['id', 'name']  // Limita los campos seleccionados
        }
      ]
    });
    console.log(appointments)
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};





export const getFutureAppointmentsWithDetails = async (req: Request, res: Response): Promise<void> => {
  const now = new Date();
  try {
    const futureAppointments = await Appointment.findAll({
      group: ['Appointment.id'],  
      where: {
        dateTime: { [Op.gt]: now }  
      },
      include: [
        { 
          model: Pet, 
          as: 'pet', 
          attributes: ['id', 'name']  
        },
        { 
          model: Professional, 
          as: 'professional', 
          attributes: ['id', 'firstname', 'lastname']  
        },
        { 
          model: Facility, 
          as: 'facility', 
          attributes: ['id', 'name']  
        }
      ]
    });
    res.json(futureAppointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching future appointments', error });
  }
};

