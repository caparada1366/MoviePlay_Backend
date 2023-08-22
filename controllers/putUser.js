const {Usuario} = require('../config/database')
const bcrypt = require('bcrypt')

const putUser = async(req, res) =>{
    const {image, password, nombre, apellido, email} = req.body;
    const {id} = req.params;

    try {
        let hashPassword = password;

        if(password){
            hashPassword = await bcrypt.hash(password, 10)
        }

       await Usuario.update({
        nombre, 
        apellido, 
        password: hashPassword, 
        image
       },
       {
        where: { id },
    }
    );
    if(!id){
        throw new Error('Error al modificar datos')
    } else {
        res.status(200).send('Datos del usuario actualizados')
    };
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {putUser}