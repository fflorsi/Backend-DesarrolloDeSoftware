import { DataTypes,Model,Optional } from 'sequelize';
import sequelize from '../db/connection.js';
import { Professional } from '../professional/professional.model.js';


interface ObservationAttributes{
    id?:number
    name: string
    professional: number
    description: string
    medicalHistoryId: number
}

interface ObservationCreationAttributes extends Optional<ObservationAttributes,'id'>{}

export class Observation extends Model<ObservationAttributes,ObservationCreationAttributes> implements ObservationAttributes{
    public id!: number
    public name!: string
    public professional!: number
    public description!: string
    public medicalHistoryId!: number

}

Observation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      professional: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'professionals', // Debe coincidir con el nombre de la tabla relacionada
          key: 'id',
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      medicalHistoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'medicalHistories', // Debe coincidir con el nombre de la tabla relacionada
          key: 'id',
        },
      },
    },
    {
      timestamps: true, // Habilita createdAt y updatedAt
      modelName: 'Observation', // Nombre del modelo
      tableName: 'observations', // Especifica el nombre de la tabla
      sequelize, // Asegúrate de pasar la instancia de Sequelize
    }
  );

Professional.hasMany(Observation, {foreignKey: 'professional', as:'Observations'} )
Observation.belongsTo(Professional, {foreignKey: 'professional', as: 'professionalData'})

