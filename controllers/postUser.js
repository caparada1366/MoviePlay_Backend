const {Usuario,  CarroCompra} = require('../config/database');
const bcrypt = require("bcrypt");
const createAccessToken = require('./libs/jwt');
const transporter = require('../config/nodeMailer')
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
const templatePath = path.join(__dirname, '../html/bienvenida.html');
//var htmlContent = fs.readFileSync(templatePath, 'utf-8'); 


const enviarCorreoBienvenida = (email, nombre, apellido) =>{
var htmlContent = fs.readFileSync(templatePath, 'utf-8'); 

htmlContent = htmlContent.replace(" <!-- {{name}}  -->", nombre);
htmlContent = htmlContent.replace("<!-- {{lastname}} -->", apellido);
htmlContent = htmlContent.replace(" <!-- {{emailUsuario}} -->", email);


    const mailOptions = {
        from: "movieplayhenry@gmail.com",
        to: email,
        subject: "Bienvenido a Movieplay",
        text: `Has creado una nueva cuenta en Movieplay con el correo ${email}` ,
        html: htmlContent,
        attachments: [
            {
                filename: 'cine.jpg',
                path: path.join(__dirname, '../html/imagenes/cine.jpg'),
                cid: 'cine'
            },
            {
                filename: 'peli2023.jpg',
                path: path.join(__dirname, '../html/imagenes/peli2023.jpg'),
                cid: 'peli2023'
            },
            {
                filename: 'Logo.png',
                path: path.join(__dirname, '../html/imagenes/Logo.png'),
                cid: 'Logo'
            }
        ]
    }
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log("no se pudo enviar correo por"+ error.message)
        }else{
            console.log("mensaje enviado exitosamente", info.response)
        }
        
    })
}


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


            //// Se crea el carrito 
            const nuevoCarro = await CarroCompra.create({
                userId: nuevoUsuario.id,
             });
            nuevoUsuario.carroCompraId = nuevoCarro.id;
            await nuevoUsuario.save();

            // Se envía correo
             enviarCorreoBienvenida(nuevoUsuario.email, nuevoUsuario.nombre, nuevoUsuario.apellido);

            res.cookie('token', token)
  

            return res.status(201).json({
                message: 'Usuario creado con éxito',
                id: userSaved.id,
                nombre: userSaved.nombre,
                apellido: userSaved.apellido,
                email: userSaved.email,
                rol: userSaved.rol     
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
         let isActive = userFound.estadoActivo;

        if (!userFound) return res.status(404).json({ message: 'No se encontro el Usuario' });
        
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({ message: 'Credenciales Invalidas' });

        if (isActive === false) return res.status(400).json({message: 'Usuario inactivo'});

        const token = await createAccessToken({ id: userFound.id });

        res.cookie('token', token)
        return res.json({
                    id: userFound.id,
                    nombre: userFound.nombre,
                    apellido: userFound.apellido,
                    email: userFound.email,
                    rol: userFound.rol,
                    image: userFound.image,
                    token     
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