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

  const { Multimedia, OrdenDeCompra, Genres, Series, Episodios, CarroCompra, Usuario } = sequelize.models;

  Multimedia.belongsToMany(Genres, {through: 'MultimediaGenres', foreignKey: 'idmultimedia'});
  Genres.belongsToMany(Multimedia, {through: 'MultimediaGenres', foreignKey: 'idgenre'});

  // Una serie puede tener varios episodios..
  Series.belongsToMany(Genres, {through: 'SeriesGenres', foreignKey: 'idgenre'});
  Genres.belongsToMany(Series, {through: 'SeriesGenres', foreignKey: 'idserie'});
  
  // Un episodio pertenece a una Serie
  Series.hasMany(Episodios, { foreignKey: 'serieId' });
  Episodios.belongsTo(Series, { foreignKey: 'episodiosId' });


  // Un usuario puede tener muchas ordenes de compra
  Usuario.hasMany(OrdenDeCompra, {foreignKey: 'usuarioId'});
  OrdenDeCompra.belongsTo(Usuario, {foreignKey: 'ordenCompraId'});

  // Un carrito de compra tiene muchas peliculas y series 
  CarroCompra.hasMany(Multimedia, {as: 'peliculas', foreignKey: 'carroCompraID'});
  Multimedia.belongsTo(CarroCompra, {foreignKey: 'carroCompraId'});
  CarroCompra.hasMany(Series, {as: 'series', foreignKey: 'carroCompraId'});
  Series.belongsTo(CarroCompra, {foreignKey: 'carroCompraId'});


// Una orden de compra tiene muchas peliculas y series
  OrdenDeCompra.hasMany(Multimedia, {as: 'peliculas', foreignKey: 'ordenCompraID'});
  Multimedia.belongsTo(OrdenDeCompra, {foreignKey: 'ordenCompraID'});
  OrdenDeCompra.hasMany(Series, {as: 'series', foreignKey: 'ordenCompraID'});
  Series.belongsTo(OrdenDeCompra, {foreignKey: 'ordenCompraID'});

  Usuario.hasOne(CarroCompra, {foreignKey: 'usuarioId'});
  CarroCompra.belongsTo(Usuario, {foreignKey: 'usuarioId'})



module.exports ={...sequelize.models, conn: sequelize, sequelize};