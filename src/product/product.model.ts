import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection.js';

// Define los atributos del producto
interface ProductAttributes {
    id?: number; // Opcional al crear un nuevo producto
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}


interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

// Modelo de producto
export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number; // Id es obligatorio después de ser creado
    public name!: string;
    public description!: string;
    public price!: number;
    public stock!: number;
    public category!: string;


    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Inicializa el modelo
Product.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true, // Habilita createdAt y updatedAt
    }
);
