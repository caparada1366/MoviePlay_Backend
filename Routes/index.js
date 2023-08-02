const { Router } = require('express');
const mediaRouter = require('./Movies-Series/mediaRouter');
const genreRouter = require('./genreRouter');
const seriesRouter = require('./seriesRouter');


const mainRouter = Router();


mainRouter.use('/media', mediaRouter);
mainRouter.use('/genres', genreRouter);
mainRouter.use('/series', seriesRouter)




module.exports = mainRouter;