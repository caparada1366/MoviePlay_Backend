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
            defaultValue: 'https://cuv.upc.edu/es/shared/imatges/fotos-professorat-i-professionals/anonimo.jpg/image_view_fullscreen' 
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