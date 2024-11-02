import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const MedicalHistory_Vaccine = sequelize.define('medicalHistory_vaccine', {
    medicalHistoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {  // Definir la relación
            model: 'medicalHistories',  
            key: 'id'  
        }
    },
    vaccineId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {  // Definir la relación
            model: 'vaccines',  
            key: 'id'  
        }
    }
}, {
    timestamps: true, // Habilita createdAt y updatedAt
    tableName: 'medicalhistories_vaccines' // Especifica el nombre de la tabla si es diferente al nombre del modelo
});

