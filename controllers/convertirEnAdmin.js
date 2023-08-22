const { Usuario } = require('../config/database');

const convertirEnAdmin = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await Usuario.findByPk(id);

        if(!user) {
            throw new Error('Usuario no encontrado');
        }
        if(user.rol === "Usuario") {
            user.rol = 'Administrador';
            await user.save();
            res.status(200).json({ message: 'Usuario convertido en Administrador exitosamente' });
        } else {
            user.rol = 'Usuario'
            await user.save();
            res.status(200).json({ message: 'Administrador convertido en Usuario exitosamente' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { convertirEnAdmin }