const {Multimedia, Series, Genres} = require('../config/database')
const {getMoviesYSeries} = require('./getMoviesYSeries')
const {Op} = require('sequelize');


const getAdminMovies = async(req, res) => {
    try {
        const {busqueda, page, genre, ordalfa, ordprecio} = req.query
        // const {id} = req.params
        const pageNumber = parseInt(page) || 1;
        const pageSize = 10;
        const offset = (pageNumber - 1) * pageSize;
        const arrayCondicionesMovies = [];
        var condicionGenre = "";
        const orden = [['id', 'ASC']];

        if(busqueda){
            arrayCondicionesMovies.push({ name: {[Op.iLike]: `%${busqueda}%`}});
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
            ordena.push('name');
            if(ordalfa === "up") ordena.push('ASC');
            if(ordalfa === "down")ordena.push('DESC');
            orden.push(ordena);
            console.log(orden);
        }
        
     
        const {count, rows} = await Multimedia.findAndCountAll({
            order: orden
              ,
              where: {
                [Op.and]:
                arrayCondicionesMovies
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
        console.log(count);
    const totalPages = Math.ceil(count / pageSize);
    const arrayRespuestaPelis = []
    rows.forEach(element =>{
        const {id, name, image, price, active, Genres} = element;
        var arrayGenres = [];
        Genres.forEach(g=>{
            arrayGenres.push(g.name);
        })
        const elementoFinal = {id, name, image, price, active, genres: arrayGenres, tipo: "Pelicula"}
        arrayRespuestaPelis.push(elementoFinal)
    });
    res.json({
        totalElementos: count,
        totalPages,
        currentPage: pageNumber,
        elementos: arrayRespuestaPelis
    })}
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

const activeMovies = async(req, res) => {
    try {
        const { id } = req.params;
        const movie = await Multimedia.findByPk(id);

        if(!movie) {
            return res.status(404).json({ error: "Película no encontrada." });
        }

        movie.active = !movie.active;
        await movie.save();

        res.status(200).json({ message: "Estado de película cambiado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    getAdminMovies,
    activeMovies
}