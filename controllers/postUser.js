const {Usuario} = require('../config/database');
const bcrypt = require("bcrypt");
const createAccessToken = require('./libs/jwt');


const postUser = async(req, res) => {
    const {nombre, apellido, email, password} = req.body;

    try {
        
        const usuario = await Usuario.findOne({
            where: {email: email}
        });
        if(usuario){
            throw new Error('El email ya está siendo usado')
        } else {
           const hashPassword = await bcrypt.hash(password, 10);
           const nuevoUsuario = await Usuario.create({
                nombre,
                apellido,
                email,
                password: hashPassword,
                // image
            });
            const userSaved = await nuevoUsuario.save();
            const token = await createAccessToken({ id: userSaved.id });
            res.cookie('token', token)
            return res.status(201).json({
                message: 'Usuario creado con éxito',
                id: userSaved.id,
                nombre: userSaved.nombre,
                email: userSaved.email     
            });
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await Usuario.findOne({ 
            where: {
                email: email,
            }
         });
        if (!userFound) return res.status(404).json({ message: 'No se encontro el Usuario' });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({ message: 'Credenciales Invalidas' });

        const token = await createAccessToken({ id: userFound.id });

        res.cookie('token', token)
        return res.json({
                    id: userFound.id,
                    nombre: userFound.nombre,
                    email: userFound.email,
                    rol: userFound.rol     
                });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    res.sendStatus(200);
};

module.exports = {
    postUser,
    loginUser,
    logoutUser
}