const {DataTypes} = require('sequelize')



module.exports = (sequelize) =>{


    const Review = sequelize.define('Review', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        calificacion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comentario:{
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}    