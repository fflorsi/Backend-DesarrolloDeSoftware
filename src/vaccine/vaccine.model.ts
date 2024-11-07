import { DataTypes,Model,Optional } from 'sequelize';
import sequelize from '../db/connection.js';


interface VaccineAttributes{
    id?:number
    name: string
}

interface VaccineCreationAttributes extends Optional<VaccineAttributes,'id'>{}

export class Vaccine extends Model<VaccineAttributes,VaccineCreationAttributes> implements VaccineAttributes{
    public id!: number
    public name!: string


}

Vaccine.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true, // Habilita createdAt y updatedAt
      tableName: 'vaccines', // Especifica el nombre de la tabla
      sequelize, // Asegúrate de pasar la instancia de Sequelize
    }
  );

