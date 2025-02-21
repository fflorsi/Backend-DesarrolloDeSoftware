import { Request, Response } from 'express';
import { Order } from './order.model.js';
import { OrderItem } from './orderDetail.model.js';
import { Product } from '../product/product.model.js';
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';


export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, total, clientId } = req.body;

    // Verificar si se proporcionó clientId
    if (!clientId) {
      res.status(400).json({ message: 'Client ID is required' });
      return;
    }

    // Crear el pedido principal
    const order = await Order.create({ total, clientId });

    // Crear cada elemento del pedido (OrderItem) en la base de datos
    const orderItems = items.map((item: any) => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderItem, as: 'items', include: [{ model: Product, as: 'product' }] },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

  

  export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [
          { model: OrderItem, as: 'items', include: [{ model: Product, as: 'product' }] },
        ],
      });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      return res.json(order);
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return res.status(500).json({ message: 'Error fetching order' });
    }
  };

  export const getMonthlyEarnings = async (req: Request, res: Response) => {
    try {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

        console.log("Rango de fechas:", startOfMonth, "a", endOfMonth);  // Debugging

        // Sumar los totales de las órdenes dentro del rango de fechas
        const earnings = await Order.sum('total', {
            where: {
                date: {
                    [Op.gte]: startOfMonth,  // Fecha de inicio
                    [Op.lte]: endOfMonth      // Fecha final
                }
            }
        });

        console.log("Ganancias obtenidas:", earnings);  // Debugging

        res.json({ earnings });
    } catch (error) {
        console.error("Error fetching monthly earnings:", error);
        res.status(500).json({ message: 'Error fetching monthly earnings' });
    }
};

export const getAllOrdersByClientId = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Obtener el clientId desde los parámetros de la URL
    const clientId = Number(req.params.clientId);

    // Verificar que el clientId sea un número válido
    if (isNaN(clientId)) {
      return res.status(400).json({ message: 'El clientId debe ser un número válido' });
    }

    // Obtener las órdenes del cliente desde la base de datos
    const orders = await Order.findAll({
      where: { clientId },  // Filtrar por el clientId
      include: [
        { 
          model: OrderItem, 
          as: 'items', 
          include: [{ model: Product, as: 'product' }]
        },
      ],
    });

    // Si no se encuentran órdenes, retornar un mensaje de error
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No se encontraron órdenes para este cliente' });
    }

    // Retornar las órdenes encontradas
    return res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by clientId:", error);
    return res.status(500).json({ message: 'Error al obtener las órdenes' });
  }
};


export const getMonthlyEarningsByClientId = async (req: Request, res: Response) => {
  try {
    // Obtener el clientId desde los parámetros de la URL
    const clientId = Number(req.params.clientId);

    // Verificar que el clientId sea un número válido
    if (isNaN(clientId)) {
      return res.status(400).json({ message: 'El clientId debe ser un número válido' });
    }

    // Definir el rango de fechas del mes actual
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

    console.log("Rango de fechas:", startOfMonth, "a", endOfMonth);  

    // Obtener las ganancias del cliente para el mes actual
    const earnings = await Order.sum('total', {
      where: {
        clientId,  
        date: {
          [Op.gte]: startOfMonth,  
          [Op.lte]: endOfMonth,    
        }
      }
    });

    // Enviar las ganancias de este mes
    res.json({ earnings });
  } catch (error) {
    console.error("Error fetching monthly earnings by clientId:", error);
    res.status(500).json({ message: 'Error fetching monthly earnings' });
  }
};





  

  