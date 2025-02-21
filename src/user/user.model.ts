import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define los atributos del modelo
interface UserAttributes {
    id: number;
    username: string;
    password: string;
    role: string;
    clientId?: number; 
    professionalId?: number; 
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'| 'role'> {}

// Extiende la clase Model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public role!: string;
    public clientId?: number; // Opcional
    public professionalId?: number; // Opcional

}
User.init(
    {
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
            allowNull: true,
            references: {
                model: 'clients',
                key: 'id'
            }
        },
        professionalId: {  
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'professionals',
                key: 'id'
            }
        }
    },
    {
        sequelize, 
        modelName: 'User ', // Nombre del modelo
        tableName: 'users', // Nombre de la tabla
        timestamps: true // Habilita createdAt y updatedAt
    }
);