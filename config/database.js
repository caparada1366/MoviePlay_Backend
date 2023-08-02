// config/database.js
require("dotenv").config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_URL,DB_PORT } = process.env;
const fs = require("fs");
const path = require("path");

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

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '../models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '../models', file)));
  });

  modelDefiners.forEach(model => {
    model(sequelize)
    
  })
   

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  
  sequelize.models = Object.fromEntries(capsEntries);

  const { Multimedia, OrdenDeCompra, Genres } = sequelize.models;

  Multimedia.belongsToMany(Genres, {through: 'MultimediaGenres'});
  Genres.belongsToMany(Multimedia, {through: 'MultimediaGenres'});

  // User orden de compra relacion de uno a muchos...

// Una serie puede tener varias temporadas
Series.hasMany(Temporadas, { foreignKey: 'serieId' });

// Una temporada pertenece a una serie
Temporadas.belongsTo(Series, { foreignKey: 'serieId' });

// Una temporada puede tener varios episodios
Temporadas.hasMany(Episodios, { foreignKey: 'temporadaId' });

// Un episodio pertenece a una temporada
Episodios.belongsTo(Temporadas, { foreignKey: 'temporadaId' });

module.exports ={...sequelize.models, conn: sequelize, sequelize};