const {DataTypes} = require('sequelize')



module.exports = (sequelize) =>{


    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png" 
        },
        estadoActivo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, 
        },
        rol:{
            type: DataTypes.STRING,
            defaultValue: "Usuario"
        }

    })
}