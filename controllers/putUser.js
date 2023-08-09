const {Usuario} = require('../config/database')

const putUser = async(req, res) =>{
    const {image, password, nombre, apellido, email} = req.body;
    const {id} = req.params;

    try {
       await Usuario.update({
        nombre, apellido, password, image
       },
       {
        where: { id },
    }
    );
    if(email){
        throw new Error('Error al modificar datos')
    } else {
        res.status(200).send('Datos del usuario actualizados')
    };
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {putUser}