const { Series, Genres, Episodios, Multimedia } = require('../config/database');
const {Op} = require('sequelize');

const getMoviesYSeries = async (req, res)=>{
    try {
        const {busqueda, page, genre, ordprecio, ordalfa, tipo} = req.query
        const pageNumber = parseInt(page) || 1;
        const pageSize = 10;
        const offset = (pageNumber - 1) * pageSize;
        const arrayCondiciones = [];
        const arrayCondicionesSeries = [];
        var condicionGenre = "";
        const orden = [['id', 'ASC']];
        const orden2 = [['serieId', 'ASC']];

        arrayCondiciones.push({active: true});          //Condicion que trae todos los productos activos 
        arrayCondicionesSeries.push({active: true}); 

        if(busqueda){
            arrayCondiciones.push({ name: {[Op.iLike]: `%${busqueda}%`}});
            arrayCondicionesSeries.push({ titulo: {[Op.iLike]: `%${busqueda}%`}});
        }
        if(genre){
            condicionGenre = {name: genre};
        }
        // if(ordprecio){
        //     var ordenp = [];
        //     ordenp.push('price');
        //     if(ordprecio === "up") ordenp.push('ASC');
        //     if(ordprecio === "down") ordenp.push('DESC');
        //     orden.push(ordenp);
        //     console.log(orden);
        // }
        // if(ordalfa){
        //     var ordena =[];
        //     ordena.push('name');
        //     if(ordalfa === "up") ordena.push('ASC');
        //     if(ordalfa === "down")ordena.push('DESC');
        //     orden.push(ordena);
        //     console.log(orden);
        // }
        
        const busquedaPelis = async ()=>{
        const {count, rows} = await Multimedia.findAndCountAll({
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
              }],
              distinct: true,
              offset: offset,
              limit: pageSize, 
        })
        console.log(count);
        const totalPages = Math.ceil(count / pageSize);
        const arrayRespuestaPelis = []
        rows.forEach(element =>{
            const {id, name, image, price, Genres} = element;
            var arrayGenres = [];
            Genres.forEach(g=>{
                arrayGenres.push(g.name);
            })
            const elementoFinal = {id, name, image, price, genres: arrayGenres, tipo: "Pelicula"}
            arrayRespuestaPelis.push(elementoFinal)
        });
        return arrayRespuestaPelis;
    }
///////////////////////////////////arriba todo para traer peliculas///////////////////////////////////////////
///////////////////////////////////abajo todo para traer series y concatenacion de resultados////////////////
       
        const busquedaSeries = async ()=>{
        const {count, rows} = await Series.findAndCountAll({
            order: orden2
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
            const {serieId, titulo, image, price, Genres} = element;
            var arrayGenres = [];
            Genres.forEach(g=>{
                arrayGenres.push(g.name);
            })
            const elementoFinal = {id: serieId, name: titulo, image, price, genres: arrayGenres, tipo: "Serie"}
            arrayRespuestaSeries.push(elementoFinal)
        });
            return arrayRespuestaSeries
        }

        
        const concatenarResultados = async()=>{
            const pelis = await busquedaPelis();
            const series = await busquedaSeries();
            return pelis.concat(series);
        }
        const respuesta = async()=>{
            try {
                const resultados = await concatenarResultados();
                res.json({ elementos: resultados });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
        respuesta();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getMoviesYSeries;