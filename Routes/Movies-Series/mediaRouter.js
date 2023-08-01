const { Router } = require('express');
// Acá habría que importar los handlers :)
const { getMedia, mediaByID, postMedia } = require('../../controllers/media/mediaHandler');

const mediaRouter = Router();


mediaRouter.get('/', getMedia)  // Osea,  '/media';  Faltarían los handlers.
mediaRouter.get('/:id', mediaByID) // Osea, '/media/id';  Faltarían los handlers.
mediaRouter.post('/', postMedia) // Faltaría el handler


module.exports = mediaRouter;

