import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

export class MedicalHistoryVaccine extends Model {
    public medicalHistoryId!: number;
    public vaccineId!: number;
}

MedicalHistoryVaccine.init(
    {
        medicalHistoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'medicalHistories', // Nombre de la tabla de MedicalHistory
                key: 'id',
            },
            primaryKey: true,
        },
        vaccineId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'vaccines', // Nombre de la tabla de Vaccine
                key: 'id',
            },
            primaryKey: true,
        },
    },
    {
        sequelize,
        tableName: 'medicalHistories_vaccines', // Nombre de la tabla intermedia
        timestamps: false, // No necesitamos timestamps para la tabla intermedia
    }
);