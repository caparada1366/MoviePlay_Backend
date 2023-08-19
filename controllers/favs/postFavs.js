const {Usuario, Multimedia, Series} = require('../../config/database')

const postFavs = async(req, res) => {
 const {email, idSerie, idMovie} = req.body;

 try {
    const usuario = await Usuario.findOne({
    where: {email: email}
    })

    //busca la pelicula por ID
    const movie = await Multimedia.findByPk(idMovie);
    //busca si hay pelicula en la tabla intermedia
    const existMovie = await usuario.hasMultimedia(movie);

    //pregunta si NO hay nada. En caso de que no, agrega
    if(!existMovie){
        const favMovie = await usuario.addMultimedia(movie)
    }else{
        throw new Error('la pelicula ya esta agregada en favoritos')
    }

    //misma logica que con movies
    const serie = await Series.findByPk(idSerie)
    const existSerie = await usuario.hasSeries(serie)

    if(!existSerie){
        const favSerie = await usuario.addSeries(serie)
    }else{
        throw new Error("la serie ya esta agregada en favoritos")
    }
   
    res.status(200).json("Agregada a favoritos")
 } catch (error) {
    res.status(404).json({error: error.message})
 }
}

module.exports = {postFavs}