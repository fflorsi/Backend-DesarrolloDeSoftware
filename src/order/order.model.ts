import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/connection.js';

interface OrderAttributes {
  id: number;
  total: number;
  date: Date;
  clientId: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'date'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public total!: number;
  public date!: Date;
  public clientId!: number;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients', 
        key: 'id', 
      },
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
