const { Series, Usuario, Multimedia, OrdenDeCompra } = require('../../config/database');

const getAllOCs = async (req, res)=>{
    try {
        const {page} = req.query;   
        const pageNumber = parseInt(page) || 1;
        const pageSize = 10;
        const offset = (pageNumber - 1) * pageSize;
        
            const arrayOC= await OrdenDeCompra.findAll({
                include: [
                    {model: Series, attributes: ['serieId', 'titulo', 'image', 'price']},
                    {model: Multimedia, attributes: ['id', 'name', 'image', 'price']}],
                distinct: true,
                offset: offset,
                limit: pageSize, 
            })
           
           
            var ventaTotal = 0;
            const precios= await OrdenDeCompra.findAll({
                include: [
                    {model: Series, attributes: ['serieId', 'titulo', 'image', 'price']},
                    {model: Multimedia, attributes: ['id', 'name', 'image', 'price']}],
                distinct: true,
                
            })

            precios.forEach(element => {
                ventaTotal += (element.total)/100
            });
            const totalPages = Math.ceil(precios.length / pageSize);

            const respuesta = {
                totalOCs: arrayOC.lenght,
                ventaTotal,
                totalPages,
                currentPage: pageNumber,
                OCs: arrayOC
            }
            res.status(200).send(respuesta)
        

       

    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = getAllOCs;