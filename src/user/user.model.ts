import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'client',
    },
      clientId: {  
        type: DataTypes.INTEGER,
        allowNull: true,  // Puede ser null si el usuario no está asociado a un cliente
        references: {  // Definir la relación
            model: 'clients',  
            key: 'id'  
        }
    }
}, {
    timestamps: true, // Habilita createdAt y updatedAt
    tableName: 'users' // Especifica el nombre de la tabla si es diferente al nombre del modelo
});
