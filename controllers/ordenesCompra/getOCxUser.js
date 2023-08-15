const { Series, Usuario, Multimedia, OrdenDeCompra } = require('../../config/database');

const getOcXUser = async (req, res)=>{
    const {idUser} = req.body;
    try {
        if(idUser){
            const arrayOC = await OrdenDeCompra.findAll({
                where: {usuarioId: idUser},
                include: [
                    {model: Series, attributes: ['serieId', 'titulo', 'image', 'price']},
                    {model: Multimedia, attributes: ['id', 'name', 'image', 'price']}]
            })
            res.status(200).send(arrayOC)
        }

       

    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = getOcXUser;