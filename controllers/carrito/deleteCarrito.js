const {Usuario, CarroCompra, Series, Multimedia, sequelize} = require('../../config/database')


//Funcion auxiliar para borrar la serie del carro de compras 
const borrarSerieCarrito = async (idSerie, idCarro)=>{
    try {
        const serie = await Series.findByPk(idSerie);;
        const carrito = await CarroCompra.findByPk(idCarro,{
            include: Series
        });
        //console.log(JSON.stringify(carrito))
        if(serie && carrito){
            if(await carrito.hasSeries(serie)){
                await carrito.removeSeries(serie)
                return "Serie borrada del carrito con éxito"
            }else{
                throw new Error("El carrito no tiene esta serie")
            }
            
        }


    } catch (error) {
        throw new Error(error.message);
    }
}


//Funcion auxiliar para borrar la pelicula del carro de compras 
const borrarMovieCarrito = async (idMovie, idCarro)=>{
    try {
        const movie = await Multimedia.findByPk(idMovie);;
        const carrito = await CarroCompra.findByPk(idCarro,{
            include: Multimedia
        });
        console.log(JSON.stringify(carrito))
        if(movie && carrito){
            if(await carrito.hasMultimedia(movie)){
                await carrito.removeMultimedia(movie)
                return "Pelicula borrada del carrito con éxito"
            }else{
                throw new Error("El carrito no tiene la pelicula")
            }
            
        }


    } catch (error) {
        throw new Error(error.message);
    }
}


//Funcion principal para borrar pelicula o serie del carro de compras 

const deleteCarrito = async (req, res)=>{
    const {emailUsuario, idSerie, idMovie} = req.query;

    try {
       
        const usuario = await Usuario.findOne({
            where: {email : emailUsuario},
            include: [
                {
                model: CarroCompra,
                include: [{model: Multimedia, attributes:['name']},
                {model: Series, attributes:['titulo']}],
        }],
        })
        //console.log(JSON.stringify(usuario));
     
        var mensaje = "";

 
       const mensajeSerie = await borrarSerieCarrito(idSerie, usuario.CarroCompra.id);
        const mensajeMovie = await borrarMovieCarrito(idMovie, usuario.CarroCompra.id);
        await usuario.CarroCompra.reload();
        
        if(mensajeSerie) mensaje += mensajeSerie;
        if(mensajeMovie) mensaje += mensajeMovie;

      
        res.status(200).send(mensaje)


    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = deleteCarrito;