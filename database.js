// Centralizar a configuração da conexão do banco de dados
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cme_calculator', 'root', '3721', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false // Desativa logs SQL no console
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



module.exports = sequelize;