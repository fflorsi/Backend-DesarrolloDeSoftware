import { Sequelize } from "sequelize";
import { config } from "dotenv";

config()
const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as any,
    port: Number(process.env.DB_PORT)
});

export default sequelize;
