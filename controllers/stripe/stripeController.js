require("dotenv").config();
const {STRIPE_SECRET_KEY} = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const {OrdenDeCompra, Multimedia, Series, Usuario, CarroCompra} = require('../../config/database');
const {borrarMovieCarrito, borrarSerieCarrito} = require('../carrito/deleteCarrito')
const fs = require('fs');
const path = require('path');
const templatePath = path.join(__dirname, '../../html/compra realizada.html');
var htmlContent = fs.readFileSync(templatePath, 'utf-8'); 
const transporter = require('../../config/nodeMailer')

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
    //console.log(carrito)
    carrito.Multimedia.forEach(peli=>{
      arrayMovies.push(peli);
    })
    carrito.Series.forEach(serie=>{
      arraySeries.push(serie)
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
    await crearOC(emailUsuario, arraySeries, arrayMovies, amount);

    //Mandamos Mail de confirmación
    await enviarCorreo(emailUsuario,arraySeries,arrayMovies,amount);

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
      const agregarMoviesOC = await arrayMovies.forEach(async Movie =>{
          const peli = await Multimedia.findByPk(Movie.id);
          if(peli) nuevaOC.addMultimedia(peli);
          
      })
      const agregarSeriesOC = await arraySeries.forEach(async Serie =>{
        const serie = await Series.findByPk(Serie.serieId);
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

      arrayMovies.forEach(movie=>{
        borrarMovieCarrito(movie.id, carrito.id);
      })

      arraySeries.forEach(serie=>{
        borrarSerieCarrito(serie.serieId, carrito.id)
      })

}


const enviarCorreo = async (emailUsuario, arraySeries, arrayMovies, amount)=>{
  console.log("se ejecuta el enviar correo")
  try{
    var todosObjetos = [];
    var textoHTML = [];
    //console.log(arrayMovies)
   // console.log(arraySeries)

    arrayMovies.forEach(mov =>{
      const objMovie = {
        id: mov.id,
        name: mov.name,
        image: mov.image,
        price: mov.price,
        tipo: "Pelicula"
      }
      todosObjetos.push(objMovie);
    })

    arraySeries.forEach(serie =>{
      const objSerie = {
        id: serie.serieId,
        name: serie.titulo,
        image: serie.image,
        price: serie.price,
        tipo: "Serie"
      }
      todosObjetos.push(objSerie);
    })

    todosObjetos.forEach(obj=>{
      if(obj){
      var texto = `<tr>
      <td class="esd-structure es-p20t es-p20r es-p20l esdev-adapt-off" align="left" bgcolor="#fef852" style="background-color: #ffffff;" esdev-config="h23">
          <table width="560" cellpadding="0" cellspacing="0" class="esdev-mso-table">                        
              <td width="180" class="esd-container-frame" align="center" valign="top">
                  <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                          <td align="center" class="esd-block-image" style="font-size: 0px;"><img src="${obj.image}" alt style="display: block; border-radius: 10px; padding-bottom: 5px; padding-top: 5px;" height="75"; width="75"></td>
                      </tr>
                  </table>
              </td>
              <td width="20"></td>
              <td class="esdev-mso-td" valign="top">
                  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                      <td width="130" align="left" class="esd-container-frame">
                          <table cellpadding="0" cellspacing="0" width="100%">
                              <td align="center" class="esd-block-text">
                                  <p class="p_name">${obj.name}</p>
                              </td>
                          </table>
                      </td>
                  </table>
              </td>
              <td width="20"></td>
              <td class="esdev-mso-td" valign="top">
                  <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                      <td width="95" align="left" class="esd-container-frame">
                          <table cellpadding="0" cellspacing="0" width="100%">
                              <td align="center" class="esd-block-text">
                                  <p>${obj.tipo}</p>
                              </td>
                          </table>
                      </td>
                  </table>
              </td>
              <td width="20"></td>
              <td class="esdev-mso-td" valign="top">
                  <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                      <td width="95" align="left" class="esd-container-frame">
                          <table cellpadding="0" cellspacing="0" width="100%">
                              <td align="center" class="esd-block-text">
                                  <p style="line-height: 150%;"><strong class="p_price">$${obj.price}</strong></p>
                              </td>
                          </table>
                      </td>
                  </table>
              </td>
          </table>
      </td>
  </tr>`;
  textoHTML.push(texto);}

    })


    

    htmlContent = htmlContent.replace('<!--CONTENEDOR-->', textoHTML.join(""));
    htmlContent = htmlContent.replace("{{total}}", amount/100);

    const mailOptions = {
      from: "movieplayhenry@gmail.com",
      to: emailUsuario,
      subject: "Resumen Orden de compra MoviePlay",
      text: `Has hecho una compra en MoviePlay` ,
      html: htmlContent,
      attachments: [
        {
          filename: 'Logo.png',
          path: path.join(__dirname, '../../html/imagenes/Logo.png'),
          cid: 'Logo'
        }
      ]
    }

    transporter.sendMail(mailOptions, (error, info)=>{
      if(error){
          console.log("no se pudo enviar correo por"+ error.message)
      }else{
          console.log("mensaje enviado exitosamente", info.response)
      }
      
  })
  }catch(error){
    console.log(error.message)
  }
}


module.exports = pago;