const { Series, Usuario, Multimedia, OrdenDeCompra, Review } = require('../../config/database');

const getMovsYSeriesXuser = async (req, res)=>{
    const {idUser} = req.query;
    try {
        const usuario = await Usuario.findOne({
            where: {id: idUser},
            include: [
                {
                model: OrdenDeCompra,
                include: [{
                    model: Multimedia,
                    include: [
                        {
                        model: Review,
                        }
                    ]
                },{
                    model: Series,
                    include: [
                        {
                        model: Review,
                        }
                    ]
                } 
                ]
                }
        ]
        });

        const arrayPelis = [];
        const arraySeries = [];

        usuario.OrdenDeCompras.forEach(oc=>{
            oc.Multimedia.forEach(peli=>{
              
                const laPeli = {
                    id: peli.id,
                    name: peli.name,
                    time: peli.time,
                    image: peli.image, 
                    price: peli.price,
                    review: peli.Reviews.length > 0 ? peli.Reviews[0] : "Sin Calificar"
                }
                arrayPelis.push(laPeli)
            })
            oc.Series.forEach(serie=>{
                const laSerie = {
                    id: serie.serieId,
                    name: serie.titulo,
                    image: serie.image, 
                    price: serie.price,
                    review: serie.Reviews.length > 0 ? serie.Reviews[0] : "Sin Calificar"
                }
                arraySeries.push(laSerie)
            })
        })

        const {email} = usuario;
        const respuesta = {
            email: email,
            peliculas: arrayPelis,
            series: arraySeries
        }

        res.status(200).send(JSON.stringify(respuesta))

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getMovsYSeriesXuser