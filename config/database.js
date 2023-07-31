// config/database.js
require("dotenv").config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_URL,DB_PORT } = process.env;

const local = true; // Cambiar a false para trabajar con el deployado

const sequelize = local === true?  new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  port: DB_PORT, 
  native: false,
  logging: false// Cambia esto al dialecto de tu base de datos (por ejemplo, 'mysql' para MySQL)
}):
new Sequelize( `${DB_URL}`,
{ logging: false, native: false });

module.exports = sequelize;