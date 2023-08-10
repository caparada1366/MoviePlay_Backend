const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{


    const CarroCompra = sequelize.define('CarroCompra', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
   
    },{ 
        timestamps: false,
      })
}