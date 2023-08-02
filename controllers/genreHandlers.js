const { Genres } = require('../config/database')

async function getGenres(req, res){
    try{
        const genres = await Genres.findAll();
        res.status(200).json(genres);
    }catch(err){
        res.status(500).json({mensaje: err.message})
    }
}

async function createGenre(req, res){
    try {
        const {name} = req.body;
        const genre = await Genres.create({
            name: name
        })
        res.status(201).json(genre)
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: error.message})
        
    }
}

module.exports = {
    getGenres,
    createGenre
}