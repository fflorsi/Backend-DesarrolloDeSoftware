import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/connection.js';

interface OrderAttributes {
  id: string;
  total: number;
  date: Date;
  paymentId: string;
  clientId: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'date'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: string;
  public total!: number;
  public date!: Date;
  public paymentId!: string;
  public clientId!: number;
}

Order.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    paymentId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE', 
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
  }
);
