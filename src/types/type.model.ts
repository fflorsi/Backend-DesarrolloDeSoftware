import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../db/connection.js';


interface TypeAttributes {
    id?: number; 
    name: string;
}


interface TypeCreationAttributes extends Optional<TypeAttributes, 'id'> {}

export class Type extends Model<TypeAttributes, TypeCreationAttributes> implements TypeAttributes {
    public id!: number; // Id es obligatorio después de ser creado
    public name!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    }, 
    {
      sequelize,
      modelName: 'Type',
      tableName: 'types',
      timestamps: true, // Habilita createdAt y updatedAt
    });

