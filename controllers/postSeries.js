const { Series, Genres, Episodios } = require('../config/database');

const postSeries = async (req, res) => {
    const {
        titulo, 
        descripcion, 
        yearEstreno, 
        actores, 
        genres,
        image, 
        numEpisodio,
        numTemporada,
        tituloEpisodio,
        descripcionEpisodio,
        linkVideo,
        duracion,
        price } = req.body;

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
            const newSerie = await Series.create({
             titulo: titulo,
             descripcion: descripcion, 
             yearEstreno: yearEstreno, 
             image: image,
             actores: actores,
             price: price
         });
     
         for (const gen of genres) {
            const [genre] = await Genres.findOrCreate({
              where: { name: gen },
            });
      
            await newSerie.addGenres(genre);
          }
        const episodio = await Episodios.create({
            numEpisodio,
            numTemporada,
            tituloEpisodio,
            descripcionEpisodio,
            linkVideo,
            duracion
          })
          newSerie.addEpisodios(episodio);
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