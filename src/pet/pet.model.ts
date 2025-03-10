import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection.js';
import { Client } from '../client/client.model.js';
import { Type } from '../types/type.model.js';

interface PetAttributes{
    id?:number
    name: string
    birthdate: Date
    type: number
    breed: string
    weight: number
    clientId: number
}

interface PetCreationAttributes extends Optional<PetAttributes,'id'>{}

export class Pet extends Model<PetAttributes,PetCreationAttributes> implements PetAttributes{
    id!:number
    name!: string
    birthdate!: Date
    type!: number
    breed!: string
    weight!: number
    clientId!: number
    createdAt?: Date
    updatedAt?: Date

}

Pet.init(
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
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'types',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      breed:{
        type: DataTypes.STRING,
        allowNull: false
      },
      weight:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      clientId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'clients',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime',
      timestamps: true, // Habilita createdAt y updatedAt
      modelName: 'Pet', // Nombre del modelo
      tableName: 'pets', // Especifica el nombre de la tabla
       // Asegúrate de pasar la instancia de Sequelize
    }
  )

  Type.hasMany(Pet, { foreignKey: 'id' });
  Pet.belongsTo(Type, { foreignKey: 'type' });