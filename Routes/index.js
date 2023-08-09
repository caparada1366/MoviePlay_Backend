const { Router } = require('express');
const mediaRouter = require('./Movies-Series/mediaRouter');
const genreRouter = require('./genreRouter');
const usuarioRouter = require('./usuarioRouter')
const carroCompraRouter = require('./carroCompraRouter')


const mainRouter = Router();


mainRouter.use('/media', mediaRouter);
mainRouter.use('/genres', genreRouter);
mainRouter.use('/series', mediaRouter);
mainRouter.use('/usuario', usuarioRouter)
mainRouter.use('/carroCompra', carroCompraRouter)




module.exports = mainRouter;