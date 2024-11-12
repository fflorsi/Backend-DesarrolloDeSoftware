import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection.js';
import { Vaccine } from '../vaccine/vaccine.model.js';
import { MedicalHistoryVaccine } from './medicalHistory_vaccines.model.js';

interface MedicalHistoryAttributes {
    id?: number;
    petId: number;
}

interface MedicalHistoryCreationAttributes extends Optional<MedicalHistoryAttributes, 'id'> { }

export class MedicalHistory extends Model<MedicalHistoryAttributes, MedicalHistoryCreationAttributes> implements MedicalHistoryAttributes {
    public id!: number;
    public petId!: number;

    // Aquí puedes agregar tipos para los métodos que necesitas
    public addVaccine!: (vaccine: Vaccine) => Promise<void>;
}

MedicalHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        petId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pets',
                key: 'id',
            },
        },
    },
    {
        timestamps: true,
        tableName: 'medicalHistories',
        sequelize,
    }
);

MedicalHistory.belongsToMany(Vaccine, {
    through: MedicalHistoryVaccine,
    foreignKey: 'medicalHistoryId',
    otherKey: 'vaccineId',
});