const { Series, Usuario, Multimedia, OrdenDeCompra } = require('../../config/database');

const getMovsYSeriesXuser = async (req, res)=>{
    const {idUser} = req.query;
    try {
        const usuario = await Usuario.findOne({
            where: {id: idUser},
            include: [
                {
                model: OrdenDeCompra,
                include: [
                    Multimedia,
                    Series
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
                }
                arrayPelis.push(laPeli)
            })
            oc.Series.forEach(serie=>{
                const laSerie = {
                    id: serie.serieId,
                    name: serie.titulo,
                    image: serie.image, 
                    price: serie.price,
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