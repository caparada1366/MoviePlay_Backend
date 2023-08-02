const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Series = sequelize.define('Series', {
  serieId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  yearEstreno: {
    type: DataTypes.INTEGER,
  },
  actores: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
}, 
{ 
  timestamps: false,
});

module.exports = Series;
