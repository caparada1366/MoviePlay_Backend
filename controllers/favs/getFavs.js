const {Usuario, Multimedia, Series, Review} = require('../../config/database')

const getFavs = async(req, res) =>{
    const{email} = req.query

    try {
        const usuario = await Usuario.findOne({
            where: {email: email},
            include: [
                {model: Multimedia, include: [{model: Review, attributes: ['calificacion']}]},
                {model: Series, include: [{model: Review, attributes: ['calificacion']}]}
                ],
                attributes: ["email", "id"]
        })
        // if(req.query.deleted === "true"){
        //     usuario = await usuario.reload();
        // }
        var arrayRespuesta = []
        usuario.Multimedia.forEach(peli => {
            const laPeli = {
                id: peli.id,
                name: peli.name,
                image: peli.image,
                price: peli.price,
                tipo: "Pelicula",
                calificacion: peli.Reviews.length > 0 ? peli.Reviews[0].calificacion : 0
            }
            arrayRespuesta.push(laPeli)
        });
        usuario.Series.forEach(peli => {
            const laSerie = {
                id: peli.serieId,
                name: peli.titulo,
                image: peli.image,
                price: peli.price,
                tipo: "Serie",
                calificacion: peli.Reviews.length > 0 ? peli.Reviews[0].calificacion : 0
            }
            arrayRespuesta.push(laSerie)
        })

        res.status(200).send({arrayRespuesta}) 
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = getFavs