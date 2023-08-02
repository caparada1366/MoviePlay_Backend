const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Episodios = sequelize.define('Episodios', {
  EpisodioId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numEpisodio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  linkVideo: {
    type: DataTypes.STRING,
    allowNull: false
},
  duracion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},
{ 
  timestamps: false,
});

module.exports = Episodios;
