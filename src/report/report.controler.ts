import { Request, Response } from 'express';
import { Order } from '../order/order.model.js';
import { Appointment } from '../appointment/appointment.model.js';
import { Facility } from '../facility/facility.model.js';
import { OrderItem } from '../order/orderDetail.model.js';
import { Product } from '../product/product.model.js';
import { Professional } from '../professional/professional.model.js';
import { Client } from '../client/client.model.js';
import { Pet } from '../pet/pet.model.js';
import { Sequelize } from 'sequelize';
import { Op, fn, col } from 'sequelize';



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

export const getMostSoldProducts = async (req: Request, res: Response) => {
  try {
    const mostSoldProducts = await OrderItem.findAll({
      attributes: [
        'productId',
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity'], // Suma la cantidad de productos vendidos
      ],
      include: [
        {
          model: Product,
          as: 'product', // Usa el alias definido en la asociación
          attributes: ['name'], // Solo incluye el nombre del producto
        },
      ],
      group: ['productId', 'product.id'], // Agrupa por el ID del producto y su relación
      order: [[Sequelize.fn('SUM', Sequelize.col('quantity')), 'DESC']], // Ordena por la cantidad total en orden descendente
    });

    res.status(200).json(mostSoldProducts);
  } catch (error) {
    console.error('Error fetching most sold products:', error);
    res.status(500).json({ error: 'Error fetching most sold products' });
  }

  
};


export const getRegisteredClientsAndPets = async (req: Request, res: Response) => {
  try {
    // Contar clientes y mascotas totales
    const totalClients = await Client.count();
    const totalPets = await Pet.count();

    // Obtener clientes por mes con COUNT
    const clientsByMonth = await Client.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m-01'), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],  // Agregar el conteo de clientes
      ],
      group: ['month'],
      order: [['month', 'ASC']],
    });

    // Obtener mascotas por mes con COUNT
    const petsByMonth = await Pet.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m-01'), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['month'],
      order: [['month', 'ASC']],
    });

    // Formatear los datos de clientes
    const clientsFormatted = clientsByMonth.map((client: any) => ({
      month: client.dataValues.month,
      totalClients: parseInt(client.dataValues.count, 10),  // Asegurarse de convertirlo a número
    }));

    // Formatear los datos de mascotas
    const petsFormatted = petsByMonth.map((pet: any) => ({
      month: pet.dataValues.month,
      totalPets: parseInt(pet.dataValues.count, 10),
    }));

    // Combinar los datos de clientes y mascotas
    const combinedData = clientsFormatted.map((client) => {
      const petData = petsFormatted.find((pet) => pet.month === client.month);
      return {
        month: client.month,
        totalClients: client.totalClients,
        totalPets: petData ? petData.totalPets : 0,
      };
    });

    // Añadir meses de mascotas que no tengan clientes
    petsFormatted.forEach((pet) => {
      if (!combinedData.some((data) => data.month === pet.month)) {
        combinedData.push({
          month: pet.month,
          totalClients: 0,
          totalPets: pet.totalPets,
        });
      }
    });

    // Ordenar los datos por mes
    combinedData.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    // Preparar la respuesta
    const report = {
      totalClients,
      totalPets,
      monthlyData: combinedData,
    };

    return res.status(200).json(report);

  } catch (error) {
    console.error('Error al generar el reporte:', error);
    return res.status(500).json({ message: 'Error al generar el reporte' });
  }
};


export const getMostActiveProfessionals = async (req: Request, res: Response) => {
  try {
    const activeProfessionals = await Appointment.findAll({
      attributes: [
        'professionalId',  
        [Sequelize.fn('COUNT', Sequelize.col('Appointment.id')), 'turnsCount'], 
      ],
      group: ['professionalId'], 
      order: [[Sequelize.fn('COUNT', Sequelize.col('Appointment.id')), 'DESC']], 
      include: [
        {
          model: Professional,  
          attributes: ['id', 'firstname', 'lastname', 'dni'], 
          required: true,  
        }
      ]
    });

    const professionalsFormatted = activeProfessionals.map((appointment: any) => {
      const professionalData = appointment.Professional; 
      if (professionalData) {
        return {
          professionalId: appointment.professionalId,
          professionalName: `${professionalData.firstname} ${professionalData.lastname}`,
          professionalDni: professionalData.dni,
          turnsAssigned: parseInt(appointment.getDataValue('turnsCount'), 10), 
        };
      } else {
        return null;  
      }
    }).filter(item => item !== null);  

    return res.status(200).json({ mostActiveProfessionals: professionalsFormatted });

  } catch (error: unknown) { 
    if (error instanceof Error) {
      console.error('Error al generar el reporte de profesionales más activos:', error.message);
      return res.status(500).json({ message: 'Error al generar el reporte de profesionales más activos', error: error.message });
    } else {
      console.error('Error desconocido:', error);
      return res.status(500).json({ message: 'Error desconocido al generar el reporte de profesionales más activos' });
    }
  }
};


export const getAppointmentsByProfessional = async (req: Request, res: Response) => {
  try {
      const { professionalId } = req.params;
      const { period, month } = req.query; // "month" o "day" y el mes en formato YYYY-MM

      if (!professionalId) {
          return res.status(400).json({ message: "Falta el ID del profesional." });
      }

      let whereCondition: any = { professionalId };

      // Si se busca por día, filtramos por el mes seleccionado
      if (period === "day" && month) {
          whereCondition.dateTime = {
              [Op.between]: [`${month}-01`, `${month}-31`]
          };
      }

      // Agrupamos por mes o día según la consulta
      const dateFormat = period === "day"
          ? Sequelize.fn('DATE_FORMAT', Sequelize.col('dateTime'), '%Y-%m-%d') // Agrupar por día
          : Sequelize.fn('DATE_FORMAT', Sequelize.col('dateTime'), '%Y-%m'); // Agrupar por mes

      // Consultamos los turnos
      const appointments = await Appointment.findAll({
          attributes: [
              [dateFormat, 'date'], 
              [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
          ],
          where: whereCondition,
          group: ['date'],
          order: [['date', 'ASC']]
      });
      return res.json(appointments);
  } catch (error) {
      console.error("Error al obtener los turnos del profesional:", error);
      res.status(500).json({ message: "Error en el servidor." });
  }
};


export const getMostAttendedFacilities = async (req: Request, res: Response) => {
  try {
    const { professionalId } = req.params;

    if (!professionalId) {
      return res.status(400).json({ message: "Falta el ID del profesional." });
    }

    // Consultamos las facilities más atendidas
    const facilities = await Appointment.findAll({
      where: { professionalId },
      attributes: [
        'facilityId', 
        [Sequelize.fn('COUNT', Sequelize.col('facilityId')), 'attendedCount']
      ],
      group: ['facilityId'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('facilityId')), 'DESC']], // Ordenar por el conteo
      include: [{
        model: Facility,  // Suponiendo que tenemos un modelo de "Facility"
        attributes: ['name']  // Asegurándonos de incluir el nombre de la facility
      }],
      limit: 5 // Limitar a las 5 más atendidas (esto es opcional)
    });

    return res.json(facilities);
  } catch (error) {
    console.error("Error al obtener las facilities más atendidas:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};


export const getMonthlySpending = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    
    if (!clientId) {
      return res.status(400).json({ message: "Falta el ID del cliente." });
    }

    const spendingData = await Order.findAll({
      attributes: [
        [Sequelize.fn("DATE_FORMAT", Sequelize.col("date"), "%Y-%m"), "month"],
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalSpent"]  // <-- FIX AQUÍ
      ],
      where: { clientId },
      group: ["month"],
      order: [["month", "ASC"]]
    });

    return res.json(spendingData);
  } catch (error) {
    console.error("Error al obtener el gasto mensual del cliente:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};


export const getMostUsedFacilitiesByClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({ message: "Falta el ID del cliente." });
    }

    const facilitiesData: any[] = await Appointment.findAll({
      attributes: [
        'facilityId',
        [Sequelize.fn('COUNT', Sequelize.col('facilityId')), 'usageCount'],
      ],
      include: [
        {
          model: Pet,
          attributes: [],
          where: { clientId }, // Filtrar por el cliente
        },
      ],
      group: ['facilityId'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('facilityId')), 'DESC']],
    });

    // Obtener los detalles de las instalaciones
    const facilityIds = facilitiesData.map(f => f.facilityId);
    const facilityDetails = await Facility.findAll({
      where: {
        id: facilityIds,
      },
    });

    // Combinar los resultados
    const result = facilitiesData.map((f: any) => {
      const facility = facilityDetails.find(fd => fd.id === f.facilityId);
      return {
        facilityId: f.facilityId,
        usageCount: f.getDataValue('usageCount'), // Usar getDataValue para acceder a usageCount
        facilityName: facility ? facility.name : null,
      };
    });

    return res.json(result);
  } catch (error) {
    console.error("Error al obtener las instalaciones más utilizadas:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

export const getMostAttendedPets = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({ message: "Falta el ID del cliente." });
    }

    // Obtener las mascotas con más atenciones
    const petData: any[] = await Appointment.findAll({
      attributes: [
        'petId',  // Identificador de la mascota
        [Sequelize.fn('COUNT', Sequelize.col('petId')), 'attentionCount'],  // Contar las atenciones por mascota
      ],
      include: [
        {
          model: Pet,
          attributes: [],  // No necesitamos atributos extra de Pet, solo su ID
          where: { clientId },  // Filtrar las mascotas por el ID del cliente
        },
      ],
      group: ['petId'],  // Agrupar por petId para contar las atenciones
      order: [[Sequelize.fn('COUNT', Sequelize.col('petId')), 'DESC']],  // Ordenar por la cantidad de atenciones
    });

    // Obtener los detalles de las mascotas
    const petIds = petData.map(f => f.petId);
    const petDetails = await Pet.findAll({
      where: {
        id: petIds,  // Filtrar por los IDs de las mascotas
      },
    });

    // Combinar los resultados
    const result = petData.map((f: any) => {
      const pet = petDetails.find(pd => pd.id === f.petId);
      return {
        petName: pet ? pet.name : null,
        attentionCount: f.getDataValue('attentionCount'),  // Acceder al valor de atenciones
      };
    });

    return res.json(result);
  } catch (error) {
    console.error("Error al obtener las mascotas con más atenciones:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};