const {Router} = require('express');
const {deleteUser} = require('../controllers/deleteUser');
const {enableUser} = require('../controllers/enableUser');
const {convertirEnAdmin} = require('../controllers/convertirEnAdmin');
const activeMovies = require('../controllers/activeMovies');
const getMovies = require('../controllers/getMovies');
const activeSeries = require('../controllers/activeSeries');
const getSeries = require('../controllers/getSeries');

const adminRouter = Router();

// Admins
adminRouter.delete('/disableUser/:id', deleteUser)
adminRouter.put('/enableUser/:id', enableUser)
adminRouter.put('/transform/:id', convertirEnAdmin)
adminRouter.put('/disableMovies/:id', activeMovies)
adminRouter.put('/disableSeries/:id', activeSeries)
adminRouter.get('/disableMovies', getMovies)
adminRouter.get('/disableSeries', getSeries)

module.exports = adminRouter;