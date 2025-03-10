import { Appointment } from './appointment/appointment.model.js';
import { Pet } from './pet/pet.model.js';
import { Professional } from './professional/professional.model.js';
import { Facility } from './facility/facility.model.js';
import { Order } from './order/order.model.js';
import { Product} from './product/product.model.js';
import { OrderItem } from './order/orderDetail.model.js';
import { Type } from './types/type.model.js';
import { Observation } from './observation/observation.model.js';
import { User } from './user/user.model.js';

Pet.hasMany(Appointment, { foreignKey: 'petId' });
Appointment.belongsTo(Pet, { foreignKey: 'petId' });

Professional.hasMany(Appointment, { foreignKey: 'professionalId' });
Appointment.belongsTo(Professional, { foreignKey: 'professionalId' });


Facility.hasMany(Appointment, { foreignKey: 'facilityId' });
Appointment.belongsTo(Facility, { foreignKey: 'facilityId' });



Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    as: 'items',
  });
  OrderItem.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order',
  });
  Product.hasMany(OrderItem, {
    foreignKey: 'productId',
    as: 'orderItems',
  });
  OrderItem.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
  });

  Professional.hasOne(User, { foreignKey: 'professionalId' });
  User.belongsTo(Professional, { foreignKey: 'professionalId' });