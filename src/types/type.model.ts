import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../db/connection';

// Define los atributos del producto
interface TypeAttributes {
    id?: number; // Opcional al crear un nuevo producto
    name: string;
}


interface TypeCreationAttributes extends Optional<TypeAttributes, 'id'> {}

// Modelo de producto
export class Type extends Model<TypeAttributes, TypeCreationAttributes> implements TypeAttributes {
    public id!: number; // Id es obligatorio después de ser creado
    public name!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Type.init(
  {
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

