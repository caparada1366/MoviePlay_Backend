const {Multimedia, Series} = require('../config/database')
const {getMoviesYSeries} = require('./getMoviesYSeries')

const activeMovies = async(req, res) => {
    try {
        const {busqueda, page, genre} = req.query
        const {id} = req.params
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
        const pelicula = await Multimedia.findByPk(id);
        if(!pelicula){
            throw new Error('No se ecnontro la pelicula')
        } else if (pelicula.active === true) {
            pelicula.active = false;
            pelicula.save();
        } else {
            pelicula.active = true;
            pelicula.save();
        }
        res.status(200).json('La pelicula se actualizo exitosamente')
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports = {activeMovies}