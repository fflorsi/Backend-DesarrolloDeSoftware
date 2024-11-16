import { Sequelize } from "sequelize";


const sequelize = new Sequelize('veterinary', 'avnadmin', 'AVNS_EazmPwvXfgYJy-zzvSW', {
    host: 'mysql-veterinary-veterinary.j.aivencloud.com',
    dialect: 'mysql',
    port: 16432
});

export default sequelize;
