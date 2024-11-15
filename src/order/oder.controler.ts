import { Request, Response } from 'express';
import { Order } from './order.model.js';
import { OrderItem } from './orderDetail.model.js';
import { Product } from '../product/product.model.js';
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';


export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { items, total } = req.body;
  
      // Crear el pedido principal
      const order = await Order.create({ total });
  
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
      console.error("Error creating order:", error);
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
      console.error("Error fetching orders:", error);
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

  

  