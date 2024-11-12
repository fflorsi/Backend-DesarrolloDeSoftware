import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection.js';


interface MedicalHistoryAttributes{
    id?:number
    petId:number
}

interface MedicalHistoryCreationAttributes extends Optional<MedicalHistoryAttributes,'id'>{}

export class MedicalHistory extends Model<MedicalHistoryAttributes,MedicalHistoryCreationAttributes> implements MedicalHistoryAttributes{
    public id!: number
    public petId !: number

}

MedicalHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pets', // Debe coincidir con el nombre de la tabla relacionada
          key: 'id',
        },
      },
    },
    {
      timestamps: true, // Habilita createdAt y updatedAt
      tableName: 'medicalHistories', // Especifica el nombre de la tabla
      sequelize, // Asegúrate de pasar la instancia de Sequelize
    }
  );

