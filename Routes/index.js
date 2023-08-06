const { Router } = require('express');
const mediaRouter = require('./Movies-Series/mediaRouter');
const genreRouter = require('./genreRouter');


const mainRouter = Router();


mainRouter.use('/media', mediaRouter);
mainRouter.use('/genres', genreRouter);
mainRouter.use('/series', mediaRouter);




module.exports = mainRouter;