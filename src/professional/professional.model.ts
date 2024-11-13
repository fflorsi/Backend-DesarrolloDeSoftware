import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const Professional = sequelize.define('professional', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
}, {
    timestamps: true, // Habilita createdAt y updatedAt
    tableName: 'professionals' // Especifica el nombre de la tabla si es diferente al nombre del modelo
});

