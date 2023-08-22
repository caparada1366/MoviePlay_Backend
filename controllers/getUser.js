const {Usuario} = require('../config/database')

const getUser = async(req, res) =>{
    const {email} = req.query

    try {
        const login = await Usuario.findOne({
            where: {email: email},
            // includes: {
            //     id: id,
            //     rol: rol
            // }
        });
        if(!login){
            throw new Error('Los datos no coinciden')
        } else {
            console.log(login.id, login.email, login.rol);
            res.status(200).json({login})
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {getUser}