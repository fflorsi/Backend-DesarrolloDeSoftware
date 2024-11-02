import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const Vaccine = sequelize.define('vaccine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
      name: {  
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true, // Habilita createdAt y updatedAt
    tableName: 'vaccines' // Especifica el nombre de la tabla si es diferente al nombre del modelo
});

