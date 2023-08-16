// config/database.js
require("dotenv").config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_URL,DB_PORT, DB_PASSWORD_DEPLOY } = process.env;
const fs = require("fs");
const path = require("path");


const local = false; // Cambiar a false para trabajar con el deployado

const sequelize = local === true?  new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  port: DB_PORT, 
  native: false,
  logging: false// Cambia esto al dialecto de tu base de datos (por ejemplo, 'mysql' para MySQL)
}):
new Sequelize( `${DB_URL}`,
{ 
  logging: false,
   native: false,
   });

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

  const { Multimedia, OrdenDeCompra, Genres, Series, Episodios, CarroCompra, Usuario, Review } = sequelize.models;

  Multimedia.belongsToMany(Genres, {through: 'MultimediaGenres', foreignKey: 'idmultimedia'});
  Genres.belongsToMany(Multimedia, {through: 'MultimediaGenres', foreignKey: 'idgenre'});

  // Una serie puede tener varios episodios..
  Series.belongsToMany(Genres, {through: 'SeriesGenres', foreignKey: 'idserie'});
  Genres.belongsToMany(Series, {through: 'SeriesGenres', foreignKey: 'idgenre'});
  
  // Un episodio pertenece a una Serie
  Series.hasMany(Episodios, { foreignKey: 'serieId' });
  Episodios.belongsTo(Series, { foreignKey: 'episodiosId' });


  // Un usuario puede tener muchas ordenes de compra
  Usuario.hasMany(OrdenDeCompra, {foreignKey: 'usuarioId'});
  OrdenDeCompra.belongsTo(Usuario, {foreignKey: 'usuarioId'});

  // Un carrito de compra tiene muchas peliculas y series, y cada pelicula o serie puede estar en muchos carritos
  CarroCompra.belongsToMany(Multimedia, {through: 'peliculasXcarro', foreignKey: 'carroCompraId'});
  Multimedia.belongsToMany(CarroCompra, {through: 'peliculasXcarro', foreignKey: 'multimediaId'});
  CarroCompra.belongsToMany(Series, {through: 'seriesXcarro', foreignKey: 'carroCompraId'});
  Series.belongsToMany(CarroCompra, {through: 'seriesXcarro', foreignKey: 'serieId'});


// Una orden de compra tiene muchas peliculas y series y una serie o pelicula puede estar en muchas ordenes de compra
  OrdenDeCompra.belongsToMany(Multimedia, {through: 'peliculasXOC', foreignKey: 'ordenCompraId'});
  Multimedia.belongsToMany(OrdenDeCompra, {through: 'peliculasXOC', foreignKey: 'multimediaId'});
  OrdenDeCompra.belongsToMany(Series, {through: 'seriesXOC', foreignKey: 'ordenCompraId'});
  Series.belongsToMany(OrdenDeCompra, {through: 'seriesXOC', foreignKey: 'serieId'});


  Usuario.hasOne(CarroCompra, {foreignKey: 'userId'});
  CarroCompra.belongsTo(Usuario, {foreignKey: 'userId'})

  // Un usuario puede tener muchas calificaciones cada calificacion solo pertenece a un usuario
  Usuario.hasMany(Review, {foreignKey: 'usuarioId'});
  Review.belongsTo(Usuario, {foreignKey: 'usuarioId'});
    
  // Calificacion pertenece a una pelicula o serie, pero cada pelicula o serie puede tener muchas calificaciones
  Series.hasMany(Review, {foreignKey: 'serieId'});
  Review.belongsTo(Series, {foreignKey: 'serieId'});
  Multimedia.hasMany(Review, {foreignKey: 'movieId'});
  Review.belongsTo(Multimedia, {foreignKey: 'movieId'});


module.exports ={...sequelize.models, conn: sequelize, sequelize};
