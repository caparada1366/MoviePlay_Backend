const {Router} = require('express');
const { postFavs } = require('../controllers/favs/postFavs');
const getFavs = require('../controllers/favs/getFavs');
const deleteFavs = require('../controllers/favs/deleteFavs');

const favsRouter = Router();

favsRouter.post('/', postFavs) 
favsRouter.get('/', getFavs)
favsRouter.delete('/', deleteFavs)

module.exports = favsRouter