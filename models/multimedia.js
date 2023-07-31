const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

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
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
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
        allowNull: false
    },
    nameSerie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numCapitulo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numTeporada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

module.exports = Multimedia;