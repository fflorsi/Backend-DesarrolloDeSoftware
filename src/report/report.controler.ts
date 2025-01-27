import { Request, Response } from 'express';
import { Order } from '../order/order.model.js';
import { Appointment } from '../appointment/appointment.model.js';
import { Facility } from '../facility/facility.model.js';
import { Sequelize } from 'sequelize';

// Ejemplo: Obtener ingresos mensuales
export const getMonthlyEarnings = async (req: Request, res: Response) => {
  try {
    // Obtener ganancias de las órdenes
    const orderEarnings = await Order.findAll({
      attributes: [
        [Sequelize.fn('YEAR', Sequelize.col('date')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total'],
      ],
      group: ['year', 'month'],
      raw: true,
    });

    // Obtener ganancias de las citas, incluyendo el precio desde la tabla facilities
    const appointmentEarnings = await Appointment.findAll({
      attributes: [
        [Sequelize.fn('YEAR', Sequelize.col('dateTime')), 'year'],
        [Sequelize.fn('MONTH', Sequelize.col('dateTime')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('Facility.price')), 'total'],
      ],
      include: [
        {
          model: Facility,
          attributes: [],  // Solo necesitamos el precio, no más columnas de Facility
        },
      ],
      group: ['year', 'month'],
      raw: true,  // Para obtener un resultado plano
    });

    // Combinar los ingresos de órdenes y citas
    const combinedEarnings = [...orderEarnings, ...appointmentEarnings];

    // Reducir para calcular los ingresos mensuales combinados
    const monthlyEarnings = combinedEarnings.reduce((acc: any, item: any) => {
      const key = `${item.year}-${item.month}`;
      if (!acc[key]) {
        acc[key] = { year: item.year, month: item.month, total: 0 };
      }
      acc[key].total += parseFloat(item.total);
      return acc;
    }, {});

    // Ordenar los resultados
    const result = Object.values(monthlyEarnings).sort(
      (a: any, b: any) => a.year - b.year || a.month - b.month
    );

    res.json(result);
  } catch (error) {
    console.error('Error fetching earnings:', error);
    res.status(500).json({ message: 'Error fetching earnings' });
  }
};

export const getMostRequestedServices = async (req: Request, res: Response) => {
  try {
      const serviceRequests: Record<string, any>[] = await Facility.findAll({
          attributes: [
              'name',  // El nombre del servicio
              [Sequelize.fn('COUNT', Sequelize.col('Appointments.id')), 'totalAppointments'],  // Cambia 'appointments.id' a 'Appointments.id'
          ],
          include: [{
              model: Appointment,
              attributes: [],  // No necesitamos traer campos de Appointment, solo contar
          }],
          group: ['Facility.id'],  // Agrupamos por el ID de la facility
          order: [[Sequelize.fn('COUNT', Sequelize.col('Appointments.id')), 'DESC']],  // Cambia 'appointments.id' a 'Appointments.id'
          raw: true,  // Esto nos asegura que los datos estarán en formato plano
      });

      // Si no hay servicios solicitados, devolver un mensaje adecuado
      if (serviceRequests.length === 0) {
          return res.status(404).json({ message: 'No services found.' });
      }

      // Aquí podemos acceder a los campos como 'name' y 'totalAppointments'
      const formattedResults = serviceRequests.map(service => ({
          name: service.name,
          totalAppointments: service.totalAppointments, // Acceso directo
      }));

      res.json(formattedResults);

  } catch (error) {
      console.error('Error fetching most requested services:', error);
      res.status(500).json({ message: 'Error fetching most requested services' });
  }
};





