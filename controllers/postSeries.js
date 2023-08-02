const { Series, Genres, Episodios } = require('../config/database');

const postSeries = async (req, res) => {
    const {
        titulo, 
        descripcion, 
        yearEstreno, 
        actores, 
        genres, 
        numEpisodio,
        numTemporada,
        tituloEpisodio,
        descripcionEpisodio,
        linkVideo,
        duracion } = req.body;

    try {
        const series = await Series.findOne({
            where: { titulo: titulo }
           });
           if(series) {
          const episodio = await Episodios.create({
            numEpisodio,
            numTemporada,
            tituloEpisodio,
            descripcionEpisodio,
            linkVideo,
            duracion
          })
          series.addEpisodios(episodio);
        } else {
            series = await Series.create({
             titulo: titulo,
             descripcion: descripcion, 
             yearEstreno: yearEstreno, 
             actores: actores
         });
     
        const genre = await Genres.findOne({
         where: { name: genres}
        })
        await series.addGenres(genre);
        const episodio = await Episodios.create({
            numEpisodio,
            numTemporada,
            tituloEpisodio,
            descripcionEpisodio,
            linkVideo,
            duracion
          })
          series.addEpisodios(episodio);
        };
        const serieCreada = await Series.findOne({
             where: { titulo: titulo },
             include: [Genres, Episodios]
           
           });

       return res.status(200).json(serieCreada);
        
    } catch (error) {
        console.error({message: error.message})
    }
};
module.exports = {
    postSeries
};