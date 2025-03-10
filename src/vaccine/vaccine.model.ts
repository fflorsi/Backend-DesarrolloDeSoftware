// vaccine.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection.js';
import { MedicalHistoryVaccine } from '../medicalHistory/medicalHistory_vaccines.model.js';

interface VaccineAttributes {
    id?: number;
    name: string;
}

interface VaccineCreationAttributes extends Optional<VaccineAttributes, 'id'> { }

export class Vaccine extends Model<VaccineAttributes, VaccineCreationAttributes> implements VaccineAttributes {
    public id!: number;
    public name!: string;
}

Vaccine.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        paranoid: true,
        deletedAt: 'destroyTime',
        timestamps: true,
        modelName: 'Vaccine',
        tableName: 'vaccines',
    }
);

// Importar MedicalHistory de forma dinámica
let MedicalHistory;
import('../medicalHistory/medicalHistory.model.js').then(module => {
    MedicalHistory = module.MedicalHistory;
    Vaccine.belongsToMany(MedicalHistory, {
        through: MedicalHistoryVaccine,
        foreignKey: 'vaccineId',
        otherKey: 'medicalHistoryId',
    });
});