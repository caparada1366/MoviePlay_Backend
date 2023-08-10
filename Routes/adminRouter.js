const {Router} = require('express');
const {deleteUser} = require('../controllers/deleteUser');
const {enableUser} = require('../controllers/enableUser');
const {convertirEnAdmin} = require('../controllers/convertirEnAdmin');

const adminRouter = Router();

// Admins
adminRouter.delete('/disableUser/:id', deleteUser)
adminRouter.put('/enableUser/:id', enableUser)
adminRouter.put('/transform/:id', convertirEnAdmin)

module.exports = adminRouter;