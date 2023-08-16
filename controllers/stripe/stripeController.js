require("dotenv").config();
const {STRIPE_SECRET_KEY} = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const {OrdenDeCompra, Multimedia, Series, Usuario, CarroCompra} = require('../../config/database');
const {borrarMovieCarrito, borrarSerieCarrito} = require('../carrito/deleteCarrito')

async function pago (req, res){
  try{
    const { amount, id,
      //arrayMovies,
      //arraySeries
      emailUsuario
    } = req.body
    const arrayMovies = []
    const arraySeries = []
    //Buscamos al usuario 
    const usuario = await Usuario.findOne({
      where: {email: emailUsuario }
    })

   //Buscamos el carrito perteneciente al usuario
    const carrito = await CarroCompra.findOne({
      where: {userId: usuario.id},
      include: [Multimedia, Series]
    })

    carrito.Multimedia.forEach(peli=>{
      arrayMovies.push(peli.id);
    })
    carrito.Series.forEach(serie=>{
      arraySeries.push(serie.serieId)
    })


////Hacemos el pago
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        payment_method: id,
        description:"pago realizado",
        confirm:true
      });
///vaciamos el carrito 
      await vaciarCarro(carrito.id, arrayMovies, arraySeries);

    ///// Aqui se crea la nueva OC   
    await crearOC(emailUsuario, arraySeries, arrayMovies, amount)

      res.send({
        message: 'Succesful payment',
        //paymentIntent
      });   
    }catch(error){
      res.send(error.message)
    }   
}

async function crearOC(emailUsuario, arraySeries, arrayMovies, amount ){

  try{ const usuario = await Usuario.findOne({where: {email: emailUsuario}})  
      const nuevaOC = await OrdenDeCompra.create({
        total: amount,
        usuarioId: usuario.id,
      })  
      usuario.ordenDeCompraId = nuevaOC.id;
      await usuario.save();
      await usuario.reload(); 
      const agregarMoviesOC = await arrayMovies.forEach(async idMovie =>{
          const peli = await Multimedia.findByPk(idMovie);
          if(peli) nuevaOC.addMultimedia(peli);
          
      })
      const agregarSeriesOC = await arraySeries.forEach(async idSerie =>{
        const serie = await Series.findByPk(idSerie);
        if(serie) nuevaOC.addSeries(serie);
      })
    //  const aPelis = await agregarMoviesOC();
    //   const aSeries = await agregarSeriesOC();
  }catch(err){
    throw new Error(err.message)
  }  
}

async function vaciarCarro(idCarro, arrayMovies, arraySeries){
      const carrito = await CarroCompra.findByPk(idCarro);

      arrayMovies.forEach(idMovie=>{
        borrarMovieCarrito(idMovie, carrito.id);
      })

      arraySeries.forEach(idSerie=>{
        borrarSerieCarrito(idSerie, carrito.id)
      })

}


module.exports = pago;