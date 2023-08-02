const {DataTypes} = require('sequelize')
const sequelize = require('../config/database');

module.exports = (sequelize) =>{


const Multimedia = sequelize.define('Multimedia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    linkVideo: {
        type: DataTypes.STRING,
        allowNull: false
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
    }
});
return Multimedia;
}


