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
           const totalPages = Math.ceil(arrayOC.length / pageSize);
           
            var ventaTotal = 0;
            arrayOC.forEach(element => {
                ventaTotal += (element.total)/100
            });

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