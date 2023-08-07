const { Router } = require('express');
const {getGenres, createGenre} = require('../controllers/genreHandlers')

const genreRouter = Router();


genreRouter.get('/', getGenres)
genreRouter.post('/', createGenre)

module.exports = genreRouter;