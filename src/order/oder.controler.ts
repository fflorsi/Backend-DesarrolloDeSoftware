import { Request, Response } from 'express';
import { Order } from './order.model';
import { OrderItem } from './orderDetail.model';

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
        include: [{ model: OrderItem }],
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
        include: [{ model: OrderItem }],
      });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      return res.json(order); // Retorna la respuesta correctamente
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return res.status(500).json({ message: 'Error fetching order' });
    }
  };