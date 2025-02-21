import { Appointment } from './appointment/appointment.model';
import { Pet } from './pet/pet.model';
import { Professional } from './professional/professional.model';
import { Facility } from './facility/facility.model';
import { Order } from './order/order.model';
import { Product} from './product/product.model';
import { OrderItem } from './order/orderDetail.model';
import { Type } from './types/type.model';
import { Observation } from './observation/observation.model';
import { User } from './user/user.model';

Pet.hasMany(Appointment, { foreignKey: 'petId' });
Appointment.belongsTo(Pet, { foreignKey: 'petId' });

Professional.hasMany(Appointment, { foreignKey: 'professionalId' });
Appointment.belongsTo(Professional, { foreignKey: 'professionalId' });

Professional.hasMany(Observation, {foreignKey: 'professional', as:'Observations'} )
Observation.belongsTo(Professional, {foreignKey: 'professional', as: 'professionalData'})

Facility.hasMany(Appointment, { foreignKey: 'facilityId' });
Appointment.belongsTo(Facility, { foreignKey: 'facilityId' });

Type.hasMany(Pet, { foreignKey: 'id' });
Pet.belongsTo(Type, { foreignKey: 'type' });

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