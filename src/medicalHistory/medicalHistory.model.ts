import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const MedicalHistory = sequelize.define('medicalHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
      petId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {  // Definir la relación
            model: 'pets',  
            key: 'id'  
        }
    }
}, {
    timestamps: true, // Habilita createdAt y updatedAt
    tableName: 'medicalHistories' // Especifica el nombre de la tabla si es diferente al nombre del modelo
});

