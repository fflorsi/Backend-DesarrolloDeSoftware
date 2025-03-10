import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection.js';

interface ProfessionalAttributes {
    id: number;
    dni: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;
    email: string;
    birthDate: Date;
}

interface ProfessionalCreationAttributes extends Optional<ProfessionalAttributes, 'id'> {}

export class Professional extends Model<ProfessionalAttributes, ProfessionalCreationAttributes> implements ProfessionalAttributes {
    public id!: number;
    public dni!: string;
    public firstname!: string;
    public lastname!: string;
    public address!: string;
    public phone!: string;
    public email!: string;
    public birthDate!: Date;
}



Professional.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        paranoid: true,
        deletedAt: 'destroyTime',
        modelName: 'Professional',
        tableName: 'professionals',
        timestamps: true, // Habilita createdAt y updatedAt
    }
);
