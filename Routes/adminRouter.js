const {Router} = require('express');
const {deleteUser} = require('../controllers/deleteUser');
const {enableUser} = require('../controllers/enableUser');
const {convertirEnAdmin} = require('../controllers/convertirEnAdmin');

const adminRouter = Router();

// Admins
usuarioRouter.delete('/disableUser/:id', deleteUser)
usuarioRouter.put('/enableUser/:id', enableUser)
usuarioRouter.put('/transform/:id', convertirEnAdmin)

module.exports = adminRouter;