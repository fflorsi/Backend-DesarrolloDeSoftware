import { Sequelize } from "sequelize";


const sequelize = new Sequelize('veterinary', 'root', 'facundo9', {
    host: 'localhost',
    dialect: 'mysql',   
});

export default sequelize;