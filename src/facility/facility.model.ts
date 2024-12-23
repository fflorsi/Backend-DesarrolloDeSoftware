import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection.js';

interface FacilityAttributes {
    id?: number;
    name: string;
    description: string;
    price: number;
}

interface FacilityCreationAttributes extends Optional<FacilityAttributes, 'id'> {}

export class Facility extends Model<FacilityAttributes, FacilityCreationAttributes> implements FacilityAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Facility.init(
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }

    },
    {
        sequelize,
        modelName: 'Facility',
        tableName: 'facilities',
        timestamps: true
    }
);