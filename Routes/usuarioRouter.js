const {Router} = require('express')
const {postUser, loginUser, logoutUser} = require('../controllers/postUser')
const {getUser} = require('../controllers/getUser')
const {putUser} = require('../controllers/putUser')
const { registroValidator, loginValidator }  = require('../midlleware/validateUser')


const usuarioRouter = Router()

usuarioRouter.post('/', registroValidator, postUser);
usuarioRouter.post('/login', loginValidator, loginUser);
usuarioRouter.post('/logout', loginValidator, logoutUser);
usuarioRouter.post('/google', getUser);
usuarioRouter.put('/:id', putUser);


module.exports = usuarioRouter