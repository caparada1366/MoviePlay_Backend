const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Temporadas = sequelize.define('temporadas', {
  TemporadaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numTemporada: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  yearEstreno: {
    type: DataTypes.INTEGER,
  },
},
{ 
  timestamps: false,
});

module.exports = Temporadas;
