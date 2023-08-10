const { Usuario } = require('../config/database');

const deleteUser = async(req, res) => {
    const { id } = req.params;
    try {
        let user = await Usuario.findByPk(id);
        user.estadoActivo = false;

        await user.save();

        res.status(200).json({ message: 'El usuario fue eliminado con éxito' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { deleteUser }