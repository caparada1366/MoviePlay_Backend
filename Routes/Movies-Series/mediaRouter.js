const { Router } = require('express');
// Acá habría que importar los handlers :)
const { getMedia, mediaByID, postMedia } = require('../../controllers/media/mediaHandler');
const getMoviesYSeries = require ('../../controllers/getMoviesYSeries')


const mediaRouter = Router();

mediaRouter.get('/todo', getMoviesYSeries)
mediaRouter.get('/', getMedia);  
mediaRouter.get('/:id', mediaByID); 
mediaRouter.post('/', postMedia); 



module.exports = mediaRouter;

