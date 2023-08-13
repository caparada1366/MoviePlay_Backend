require("dotenv").config();
const {STRIPE_SECRET_KEY} = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const {OrdenDeCompra, Multimedia, Series, Usuario} = require('../../config/database')

async function pago (req, res){
  try{
    const { amount,
      //arrayMovies,
      //arraySeries
      //emailUsuario
    } = req.body
    const arrayMovies = [2,6,4]
    const arraySeries = [3,4,5]
    var emailUsuario = "hola@gmail.com"

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

    ///// Aqui se crea la nueva OC   
    await crearOC(emailUsuario, arraySeries, arrayMovies, amount)

      res.send({
        clientSecret: paymentIntent.client_secret,
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


module.exports = pago;