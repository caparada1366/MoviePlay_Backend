const { Router } = require('express');
const postCarrito = require('../controllers/carrito/postCarrito')
const {deleteCarrito} = require('../controllers/carrito/deleteCarrito')
const getCarrito = require('../controllers/carrito/getCarrito')


const carroCompraRouter = Router();

carroCompraRouter.post('/', postCarrito);  ////debe recibir emailUsuario, idSerie o idMovie por body (con esos nombres)
carroCompraRouter.delete('/', deleteCarrito); ////debe recibir emailUsuario, idSerie o idMovie por body (con esos nombres)
carroCompraRouter.get('/', getCarrito) //// recibe emailUsuario por body 


module.exports = carroCompraRouter;