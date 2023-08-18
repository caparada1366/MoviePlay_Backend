const {Usuario} = require('../config/database')

const getUser = async(req, res) =>{
    const {email} = req.query

    try {
        const login = await Usuario.findOne({
            where: {email: email}
        });
        if(!login){
            throw new Error('Los datos no coinciden')
        } else {
            res.status(200).json('Iniciando sesion')
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {getUser}