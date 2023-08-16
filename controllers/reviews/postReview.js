const { Series, Usuario, Multimedia, Review } = require('../../config/database');
const {Op} = require('sequelize');

async function postReview(req, res) {
    const {calificacion, comentario, idUser, idMovie, idSerie} = req.body;
    try{

    const condicion = ()=>{
        if(idSerie) return {
            serieId: idSerie,
            usuarioId: idUser
        }
        if(idMovie) return {
            movieId: idMovie,
            usuarioId: idUser
        }
    }
    const repetido = condicion();

    const review = await Review.findOne({
        where: repetido
    })
    
    if(review){
        throw new Error('Ya calificaste esta multimedia')
    }

    if(idSerie){
        const nuevaReview = await Review.create({
            calificacion,
            comentario,
            serieId: idSerie,
            usuarioId: idUser
        })
        res.status(200).send(nuevaReview);
    }
    if(idMovie){
        const nuevaReview = await Review.create({
            calificacion,
            comentario,
            movieId: idMovie,
            usuarioId: idUser
        })
        res.status(200).send(nuevaReview);
    }
    }catch(error){
        res.status(500).send(error.message);
    }
}

module.exports = postReview;