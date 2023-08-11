const {Series, Genres} = require('../config/database')
const {Op} = require('sequelize');

const getAdminSeries = async(req, res) => {
    try {
        const {busqueda, page, genre, ordalfa, ordprecio} = req.query
        const pageNumber = parseInt(page) || 1;
        const pageSize = 10;
        const offset = (pageNumber - 1) * pageSize;
        const arrayCondicionesSeries = [];
        var condicionGenre = "";
        const orden = [];

        if(busqueda){
            arrayCondicionesSeries.push({ titulo: {[Op.iLike]: `%${busqueda}%`}});
        }
        if(genre){
            condicionGenre = {name: genre};
        }
        if(ordprecio){
            var ordenp = [];
            ordenp.push('price');
            if(ordprecio === "up") ordenp.push('ASC');
            if(ordprecio === "down") ordenp.push('DESC');
            orden.push(ordenp);
            console.log(orden);
        }
        if(ordalfa){
            var ordena =[];
            ordena.push('titulo');
            if(ordalfa === "up") ordena.push('ASC');
            if(ordalfa === "down")ordena.push('DESC');
            orden.push(ordena);
            console.log(orden);
        }
     
    
        const {count, rows} = await Series.findAndCountAll({
            order: orden
              ,
            where: {
                [Op.and]:
                arrayCondicionesSeries
            },
            include: [{
                model: Genres,
                where: condicionGenre,
                attributes: ['name'],
                through: {attributes: []},
                required: true
            }],
            distinct: true,
            offset: offset,
            limit: pageSize, 
        })
        const totalPages = Math.ceil(count / pageSize);
        const arrayRespuestaSeries = []
        rows.forEach(element =>{
            const {serieId, titulo, image, price, active, Genres} = element;
            var arrayGenres = [];
            Genres.forEach(g=>{
                arrayGenres.push(g.name);
            })
            const elementoFinal = {id: serieId, name: titulo, image, price, active, genres: arrayGenres, tipo: "Serie"}
            arrayRespuestaSeries.push(elementoFinal)
        });
        res.json({
            totalElementos: count,
            totalPages,
            currentPage: pageNumber,
            elementos: arrayRespuestaSeries
        })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

const activeSeries = async(req, res) => {
    try {
        const { id } = req.params;
        const serie = await Series.findByPk(id);

        if(!serie) {
            return res.status(404).json({ error: "Serie no encontrada." });
        }

        serie.active = !serie.active;
        await serie.save();

        res.status(200).json({ message: "Estado de serie cambiado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    activeSeries,
    getAdminSeries,
};