const {Usuario, Series, Multimedia} = require('../../config/database')

const deleteFavs = async(req, res) => {
    const {email, MultimediumId, SeriesSerieId} = req.query;

    try {
        const usuario = await Usuario.findOne({
            where: {email: email},
            include: [
                {model: Multimedia},
                {model: Series}
            ]
        })

        if(SeriesSerieId){
            const serie = await Series.findByPk(SeriesSerieId);
            const existSerie = await usuario.hasSeries(serie);
            if(!existSerie){
                throw new Error('La serie no esta en la lista de favoritos')
            } else {
                await usuario.removeSeries(serie)
            };
        }
        
        if(MultimediumId){
            const movie = await Multimedia.findByPk(MultimediumId);
            const existMovie = await usuario.hasMultimedia(movie)
            if(!existMovie){
                throw new Error('La pelicula no esta en la lista de favoritos')
            } else {
                await usuario.removeMultimedia(movie)
            }
        }

        res.status(200).json('Se eliminó de favoritos')
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = deleteFavs