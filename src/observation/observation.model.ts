import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const Observation = sequelize.define('observation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    professional: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'professionals',
          key: 'id'
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
      medicalHistoryId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {  // Definir la relación
            model: 'medicalHistories',  
            key: 'id'  
        }
    }
}, {
    timestamps: true, // Habilita createdAt y updatedAt
    tableName: 'observations' // Especifica el nombre de la tabla si es diferente al nombre del modelo
});

