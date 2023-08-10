const {Series} = require('../config/database')

const activeSeries = async(req, res) => {
    try {
        const {busqueda, page, genre} = req.query
        const {id} = req.params
        const pageNumber = parseInt(page) || 1;
        const pageSize = 10;
        const offset = (pageNumber - 1) * pageSize;
        const arrayCondicionesSeries = [];
        var condicionGenre = "";
        const orden = [['id', 'ASC']];

        if(busqueda){
            arrayCondicionesSeries.push({ name: {[Op.iLike]: `%${busqueda}%`}});
        }
        if(genre){
            condicionGenre = {name: genre};
        }
        const series = await Series.findByPk(id);
        if(!series){
            throw new Error('No se ecnontro la serie')
        } else if (series.active === true) {
            series.active = false;
            series.save();
        } else {
            series.active = true;
            series.save();
        }
        res.status(200).json('La series se actualizo exitosamente')
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};


module.exports = activeSeries;