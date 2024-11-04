import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const Pet = sequelize.define('pet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
        }
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weight:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
      clientId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {  // Definir la relación
            model: 'clients',  
            key: 'id'  
        }
    }
}, {
    timestamps: true, // Habilita createdAt y updatedAt
    tableName: 'pets' // Especifica el nombre de la tabla si es diferente al nombre del modelo
});

