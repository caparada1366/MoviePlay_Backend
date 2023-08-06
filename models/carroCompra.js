const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{


    const CarroCompra = sequelize.define('CarroCompra', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        peliculasCarrito:{
            type: DataTypes.ARRAY(DataTypes.JSON)
        },
        seriesCarrito:{
            type: DataTypes.ARRAY(DataTypes.JSON)
        }

    })
}