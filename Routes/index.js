const { Router } = require('express');
const mediaRouter = require('./Movies-Series/mediaRouter');

const mainRouter = Router();


mainRouter.use('/media', mediaRouter);



module.exports = mainRouter;