import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection.js';

interface MedicalHistoryVaccineAttributes {
    medicalHistoryId: number;
    vaccineId: number;
}

export class MedicalHistoryVaccineModel extends Model<MedicalHistoryVaccineAttributes> implements MedicalHistoryVaccineAttributes {
    public medicalHistoryId!: number;
    public vaccineId!: number;
}

MedicalHistoryVaccineModel.init({
    medicalHistoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vaccineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'medicalhistories_vaccines',
});

