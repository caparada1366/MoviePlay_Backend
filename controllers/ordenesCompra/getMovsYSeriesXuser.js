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
                var laRev     
                for(let i = 0; i< peli.Reviews.length; i++){
                    console.log("uno"+peli.Reviews[i].usuarioId+" dos"+idUser)
                    if(peli.Reviews[i].usuarioId == idUser){
                        console.log("se cumple")
                        laRev = peli.Reviews[i];
                    }
                }

                const laPeli = {
                    id: peli.id,
                    name: peli.name,
                    time: peli.time,
                    image: peli.image, 
                    price: peli.price,
                    review: laRev || 'Sin Calificar'
                }
                arrayPelis.push(laPeli)
            })
            oc.Series.forEach(serie=>{
                var laRev     
                for(let i = 0; i< serie.Reviews.length; i++){
                    console.log("uno"+serie.Reviews[i].usuarioId+" dos"+idUser)
                    if(serie.Reviews[i].usuarioId == idUser){
                        console.log("se cumple")
                        laRev = serie.Reviews[i];
                    }
                }
                const laSerie = {
                    id: serie.serieId,
                    name: serie.titulo,
                    image: serie.image, 
                    price: serie.price,
                    review: laRev || 'Sin Calificar'
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