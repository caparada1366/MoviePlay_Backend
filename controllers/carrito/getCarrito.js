const {Usuario, CarroCompra, Series, Multimedia, sequelize} = require('../../config/database')


const getCarrito = async (req, res)=>{
    const {emailUsuario} = req.body;

    try {
        const usuario = await Usuario.findOne({
            where: {email : emailUsuario},
            include: [
                {
                model: CarroCompra,
                include: [{model: Multimedia, attributes:['name', 'price']},
                {model: Series, attributes:['titulo', 'price']}],
                attributes: ['id']
        }],
        attributes:['email']
        })
       
        res.status(200).send(JSON.stringify(usuario))

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = getCarrito