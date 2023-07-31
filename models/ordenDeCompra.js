const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenDeCompra = sequelize.define('OrdenDeCompra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.FLOAT,  
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = OrdenDeCompra;