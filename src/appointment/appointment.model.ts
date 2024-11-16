import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection.js';

// Define los atributos del turno
interface AppointmentAttributes {
    id?: number; // Opcional al crear un nuevo turno
    petId: number;
    professionalId: number;
    facilityId: number;
    dateTime: Date;
    state: string; // Atributo para el estado del turno
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id'> {}

// Modelo de Appointment (Turno)
export class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes> implements AppointmentAttributes {
    public id!: number; // Id es obligatorio después de ser creado
    public petId!: number;
    public professionalId!: number;
    public facilityId!: number;
    public dateTime!: Date;
    public state!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Inicializa el modelo
Appointment.init(
    {
        petId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pets', // Nombre de la tabla 'pets'
                key: 'id'
            }
        },
        professionalId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'professionals', // Nombre de la tabla 'professionals'
                key: 'id'
            }
        },
        facilityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'facilities', // Nombre de la tabla 'facilities'
                key: 'id'
            }
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'scheduled' // Valor por defecto
        }
    },
    {
        sequelize,
        modelName: 'Appointment',
        tableName: 'appointments', // Nombre de la tabla 'appointments'
        timestamps: true, // Habilita createdAt y updatedAt
    }
);
