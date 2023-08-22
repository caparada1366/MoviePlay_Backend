const { Series, Genres, Episodios, Multimedia } = require('../config/database');
const {Op} = require('sequelize');

const getMovies = async (req, res)=>{
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
        arrayCondiciones.push({ name: {[Op.iLike]: `%${busqueda}%`}});
     
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
    
    orden.push(['id', 'ASC']);

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

module.exports = getMovies;