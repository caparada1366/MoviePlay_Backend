// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres', // Cambia esto al dialecto de tu base de datos (por ejemplo, 'mysql' para MySQL)
});

module.exports = sequelize;