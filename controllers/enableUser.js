const { Usuario } = require('../config/database');

const enableUser = async(req, res) => {
    const { id } = req.params;
    try {

        if(!id) {
            throw new Error('No se asigno un ID');
        } else {
            const user = await Usuario.findByPk(id);

            if(!user) {
                throw new Error('Usuario no encontrado')
            } 

            user.estadoActivo = true;
            user.save();

            res.status(200).json({ message: 'Usuario restaurado con éxito' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { enableUser }