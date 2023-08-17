const {Router} = require('express');
const {deleteUser} = require('../controllers/deleteUser');
const {enableUser} = require('../controllers/enableUser');
const {convertirEnAdmin} = require('../controllers/convertirEnAdmin');
const activeMovies = require('../controllers/activeMovies');
const getMoviesAdmin = require('../controllers/admin/getMoviesAdmin');
const activeSeries = require('../controllers/activeSeries');
const getSeriesAdmin = require('../controllers/admin/getSeriesAdmin');
const { updateMovies, updateSeries } = require('../controllers/updateMovies&Series');
const { getAllUser } = require('../controllers/getAllUser');
const { topFiveMovie } = require('../controllers/getTopFive');

const adminRouter = Router();

// Admins
adminRouter.get('/allUser', getAllUser) // trae todos lo usuarios, paginado y searchBar incluido.
adminRouter.delete('/disableUser/:id', deleteUser) // banear usuario
adminRouter.put('/enableUser/:id', enableUser) // desbanear
adminRouter.put('/transform/:id', convertirEnAdmin) // convertir a Admin
adminRouter.put('/disableMovies/:id', activeMovies) // desactivar una peli
adminRouter.put('/disableSeries/:id', activeSeries) // desactivar una serie
adminRouter.get('/disableMovies', getMoviesAdmin) // traer las movies al dashboard (filtros, ordenados, etc)
adminRouter.get('/disableSeries', getSeriesAdmin) // traer las series al dashboard (filtros, ordenados, etc)
adminRouter.put('/updateMovies/:id', updateMovies) // actualizar info de las pelis 
adminRouter.put('/updateSeries/:id', updateSeries) // actualizar info de las series
adminRouter.get('/topFive', topFiveMovie)

module.exports = adminRouter;