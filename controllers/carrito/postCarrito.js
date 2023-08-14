const {Usuario, CarroCompra, Series, Multimedia, sequelize} = require('../../config/database')


//Funnción auxiliar para agregar la serie al carro de compras 

const agregarSerieCarrito = async (idSerie, idCarro)=>{
    try {
        const serie = await Series.findByPk(idSerie);;
        const carrito = await CarroCompra.findByPk(idCarro,{
            include: Series
        });
        console.log(JSON.stringify(carrito))
        if(serie && carrito){
            var repetido = false;
            carrito.Series.forEach(show =>{
                if(show.serieId === idSerie)repetido = true;
            })
            if(repetido){
                throw new Error('La serie ya está en el carrito')
            }else{
                await carrito.addSeries(serie);
                return 'Serie agregada al carrito exitosamente'
            }
            
        }


    } catch (error) {
        throw new Error(error.message);
    }
}

//Funcion auxiliar para agregar la pelicula al carro de compras 


const agregarMovieCarrito = async (idMovie, idCarro)=>{
    try {
        const movie = await Multimedia.findByPk(idMovie);;
        const carrito = await CarroCompra.findByPk(idCarro,{
            include: Multimedia
        });
        console.log(JSON.stringify(carrito))
        if(movie && carrito){
            var repetido = false;
            carrito.Multimedia.forEach(peli =>{
                if(peli.id === idMovie)repetido = true;
            })
            if(repetido){
                throw new Error('La pelicula ya está en el carrito')
            }else{
                await carrito.addMultimedia(movie);
                return 'Pelicula agregada al carrito exitosamente'
            }
            
        }


    } catch (error) {
        throw new Error(error.message);
    }
}


//Funcion principal para agregar serie o pelicula al carro de compras 

const postCarrito = async (req, res)=>{
    const {emailUsuario, idSerie, idMovie} = req.query;

    try {
        
        const idSerieN = parseInt(idSerie);
        const idMovieN = parseInt(idMovie);
        const usuario = await Usuario.findOne({
            where: {email : emailUsuario},
            include: [
                {
                model: CarroCompra,
                include: [{model: Multimedia, attributes:['name']},
                {model: Series, attributes:['titulo']}],
        }],
        })
        console.log("llamando el post" + JSON.stringify(usuario));
     
        var mensaje = "";

        if(usuario && !usuario.CarroCompra){
            const nuevoCarro = await CarroCompra.create({
                userId: usuario.id,
             });
            usuario.carroCompraId = nuevoCarro.id;
            
            await usuario.save();
            
            mensaje = "Se ha creado el carrito al usuario y "
            await usuario.reload(); 
        }

        await usuario.reload();
       const mensajeSerie = await agregarSerieCarrito(idSerieN, usuario.CarroCompra.id);
        const mensajeMovie = await agregarMovieCarrito(idMovieN, usuario.CarroCompra.id);
        await usuario.CarroCompra.reload();
        
        if(mensajeSerie) mensaje += mensajeSerie;
        if(mensajeMovie) mensaje += mensajeMovie;

      
        res.status(200).send(mensaje)


    } catch (error) {
        res.status(404).send(error.message)
    }
}



module.exports = postCarrito;