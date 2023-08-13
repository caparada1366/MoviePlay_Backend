const {Multimedia} = require('../config/database')

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


module.exports = activeMovies;