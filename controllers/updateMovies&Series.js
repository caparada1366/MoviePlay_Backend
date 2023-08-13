const { Multimedia, Genres, Series } = require('../config/database')

const updateMovies = async(req, res) => {
    try {
        const { id } = req.params;
        const movie = await Multimedia.findByPk(id, {
            include: [Genres]
        });

        if(!movie) {
            return res.status(404).json({ error: "Película no encontrada" });
        }

        const { name, description, time, linkVideo, image, price, genres } = req.body;

        if (name) {
            movie.name = name;
        }
        if (description) {
            movie.description = description;
        }
        if (time) {
            movie.time = time;
        }
        if (linkVideo) {
            movie.linkVideo = linkVideo;
        }
        if (image) {
            movie.image = image;
        }
        if (price) {
            movie.price = price
        }
        if (genres) {
            await movie.setGenres([]);

            for (const gen of genres) {
                const [genre] = await Genres.findOrCreate({
                  where: { name: gen },
                });
          
                await movie.addGenres(genre);
              }
        }

        await movie.save();
        res.status(200).json({ message: "Película actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 


const updateSeries = async(req, res) => {
    try {
        const { id } = req.params;
        const serie = await Series.findByPk(id, {
            include: [Genres]
        });

        if(!serie) {
            return res.status(404).json({ error: "Serie no encontrada" });
        }

        const {titulo, descripcion, yearEstreno, actores, image, genres, price } = req.body

        if (titulo) {
            serie.titulo = titulo;
        }
        if (descripcion) {
            serie.descripcion = descripcion;
        }
        if (yearEstreno) {
            serie.yearEstreno = yearEstreno;
        }
        if (actores) {
            serie.actores = actores;
        }
        if (image) {
            serie.image = image;
        }
        if (price) {
            serie.price = price;
        }
        if (genres) {
            await serie.setGenres([]);

            for (const gen of genres) {
                const [genre] = await Genres.findOrCreate({
                  where: { name: gen },
                });
          
                await serie.addGenres(genre);
              }
        }

        await serie.save();
        res.status(200).json({ message: "Serie actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    updateMovies,
    updateSeries
};