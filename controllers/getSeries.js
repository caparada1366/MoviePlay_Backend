const { Series, Genres, Episodios, Multimedia, Review } = require('../config/database');
const {Op} = require('sequelize');

const getSeries = async (req, res)=>{
    try{
    const {busqueda, page, genre, ordprecio, ordalfa, tipo} = req.query
    const url = req.originalUrl
    const pageNumber = parseInt(page) || 1;
    const pageSize = 10;
    const offset = (pageNumber - 1) * pageSize;
    const arrayCondiciones = [];
    var condicionGenre = "";
    const orden = [];

    if( !url.includes('admin') ){
        arrayCondiciones.push({active: true});          //Condicion que trae todos los productos activos 
    }

    if(busqueda){
        arrayCondiciones.push({ titulo: {[Op.iLike]: `%${busqueda}%`}});
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
     
    orden.push(['serieId', 'ASC']);

        const {count, rows} = await Series.findAndCountAll({
            order: orden
              ,
            where: {
                [Op.and]:
                arrayCondiciones
            },
            include: [{
                model: Genres,
                where: condicionGenre,
                attributes: ['name'],
                through: {attributes: []},
                required: true
            },
            {
                model: Review,
                attributes: ['calificacion'] 
            }],
            distinct: true,
            offset: offset,
            limit: pageSize, 
        })
        const totalPages = Math.ceil(count / pageSize);
        const arrayRespuestaSeries = []
        rows.forEach(element =>{
            const {serieId, titulo, image, price, active, Genres, Reviews} = element;
            var arrayGenres = [];
            var sumaCal = 0;
            var calProm = 0
            Genres.forEach(g=>{
                arrayGenres.push(g.name);
            })
            if(Reviews.length >0 ){
                Reviews.forEach(rev=>{
                    sumaCal += rev.calificacion
                })
                calProm = sumaCal/Reviews.length;     
            }
            const elementoFinal = {id: serieId, name: titulo, image, price, active, genres: arrayGenres, tipo: "Seriexx", calificacion: calProm}
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

const getAllSeries = async (req, res)=>{
    try {
     
        const allSeries = await Series.findAll({
            attributes: ['titulo']
        })

        res.status(200).send(allSeries)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getSeries,
    getAllSeries};