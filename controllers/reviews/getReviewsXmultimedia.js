const { Series, Usuario, Multimedia, Review } = require('../../config/database');

async function getReviewsXmultimedia(req, res) {

    const {idMovie, idSerie} = req.body;
    try {
        if(idSerie){
            const reviews = await Series.findByPk(idSerie, {
                include: Review
            })
            res.status(200).send(JSON.stringify(reviews))
        }
        if(idMovie){
            const reviews = await Multimedia.findByPk(idMovie, {
                include: Review
            })  
            res.status(200).send(JSON.stringify(reviews))
        }
          
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getReviewsXmultimedia;