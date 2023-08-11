const {Router} = require('express');
const {deleteUser} = require('../controllers/deleteUser');
const {enableUser} = require('../controllers/enableUser');
const {convertirEnAdmin} = require('../controllers/convertirEnAdmin');
const { activeMovies, getAdminMovies } = require('../controllers/activeMovies');
const { activeSeries, getAdminSeries } = require('../controllers/activeSeries');

const adminRouter = Router();

// Admins
adminRouter.delete('/disableUser/:id', deleteUser)
adminRouter.put('/enableUser/:id', enableUser)
adminRouter.put('/transform/:id', convertirEnAdmin)
adminRouter.put('/disableMovies/:id', activeMovies)
adminRouter.put('/disableSeries/:id', activeSeries)
adminRouter.get('/disableMovies', getAdminMovies)
adminRouter.get('/disableSeries', getAdminSeries)

module.exports = adminRouter;
// const series = await Series.findByPk(id);
// if(!series){
//     throw new Error('No se ecnontro la serie')
// } else if (series.active === true) {
//     series.active = false;
//     series.save();
// } else {
//     series.active = true;
//     series.save();
// }
// res.status(200).json('La series se actualizo exitosamente')
// } catch (error) {
// res.status(400).json({error: error.message})
// }