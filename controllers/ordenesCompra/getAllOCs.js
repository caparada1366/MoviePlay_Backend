const { Series, Usuario, Multimedia, OrdenDeCompra } = require('../../config/database');

const getAllOCs = async (req, res)=>{
    try {
        
            const arrayOC = await OrdenDeCompra.findAll({
                include: [
                    {model: Series, attributes: ['serieId', 'titulo', 'image', 'price']},
                    {model: Multimedia, attributes: ['id', 'name', 'image', 'price']}]
            })
            res.status(200).send(arrayOC)
        

       

    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = getAllOCs;