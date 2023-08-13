const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


module.exports = (sequelize) =>{


const OrdenDeCompra = sequelize.define('OrdenDeCompra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.FLOAT,  
        allowNull: false,
    },
    // state: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },

});
    return OrdenDeCompra;
}

