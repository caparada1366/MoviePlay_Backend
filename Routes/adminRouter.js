const {Router} = require('express');
const {deleteUser} = require('../controllers/deleteUser');
const {enableUser} = require('../controllers/enableUser');
const {convertirEnAdmin} = require('../controllers/convertirEnAdmin');
const { activeMovies } = require('../controllers/activeMovies');
const activeSeries = require('../controllers/activeSeries');

const adminRouter = Router();

// Admins
adminRouter.delete('/disableUser/:id', deleteUser)
adminRouter.put('/enableUser/:id', enableUser)
adminRouter.put('/transform/:id', convertirEnAdmin)
adminRouter.put('/disableMovies/:id', activeMovies)
adminRouter.put('/disableSeries/:id', activeSeries)

module.exports = adminRouter;