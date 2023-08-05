const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


module.exports = (sequelize) =>{
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  actores: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, 
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
},
}, 
{ 
  timestamps: false,
});
}
