const {Usuario} = require('../config/database')

const postUser = async(req, res) => {
    const {nombre, apellido, email, password} = req.body;

    try {
        if(!nombre || !apellido || !email || !password){
            throw new Error('Completar todos los campos')
        }
        const usuario = await Usuario.findOne({
            where: {email: email}
        });
        if(usuario){
            throw new Error('El email ya está siendo usado')
        } else {
            await Usuario.create({
                nombre,
                apellido,
                email,
                password,
            })
        }
       return res.status(201).json('Usuario creado con éxito')
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {postUser}