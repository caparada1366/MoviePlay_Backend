const {Router} = require('express');
const {deleteUser} = require('../controllers/deleteUser');
const {enableUser} = require('../controllers/enableUser');
const {convertirEnAdmin} = require('../controllers/convertirEnAdmin');
const activeMovies = require('../controllers/activeMovies');
const getMovies = require('../controllers/getMovies');
const activeSeries = require('../controllers/activeSeries');
const getSeries = require('../controllers/getSeries');
const { updateMovies, updateSeries } = require('../controllers/updateMovies&Series');

const adminRouter = Router();

// Admins
adminRouter.delete('/disableUser/:id', deleteUser) // banear usuario
adminRouter.put('/enableUser/:id', enableUser) // desbanear
adminRouter.put('/transform/:id', convertirEnAdmin) // convertir a Admin
adminRouter.put('/disableMovies/:id', activeMovies) // desactivar una peli
adminRouter.put('/disableSeries/:id', activeSeries) // desactivar una serie
adminRouter.get('/disableMovies', getMovies) // traer las movies al dashboard (filtros, ordenados, etc)
adminRouter.get('/disableSeries', getSeries) // traer las series al dashboard (filtros, ordenados, etc)
adminRouter.put('/updateMovies/:id', updateMovies) // actualizar info de las pelis 
adminRouter.put('/updateSeries/:id', updateSeries) // actualizar info de las series

module.exports = adminRouter;