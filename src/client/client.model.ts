import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection.js';

// Define los atributos del cliente
interface ClientAttributes {
    id?: number; // Opcional al crear un nuevo cliente
    dni: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;
    email: string;
    birthDate: Date; // Asegúrate de usar Date para la fecha
}


interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}

// Modelo de Cliente
export class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
    public id!: number; // Id es obligatorio después de ser creado
    public dni!: string;
    public firstname!: string;
    public lastname!: string;
    public address!: string;
    public phone!: string;
    public email!: string;
    public birthDate!: Date;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Inicializa el modelo
Client.init(
    {
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
        phone: {
            type: DataTypes.STRING,
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
    },
    {
        sequelize,
        modelName: 'Client',
        tableName: 'clients',
        timestamps: true, // Habilita createdAt y updatedAt
    }
);
