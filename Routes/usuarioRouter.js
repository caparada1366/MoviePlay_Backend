const {Router} = require('express')
const {postUser, loginUser, logoutUser, perfil} = require('../controllers/postUser')
const {getUser} = require('../controllers/getUser')
const {putUser} = require('../controllers/putUser')
const { registroValidator, loginValidator }  = require('../midlleware/validateUser')
const authUser = require('../midlleware/validateToken')


const usuarioRouter = Router()

usuarioRouter.post('/', authUser, postUser);
usuarioRouter.post('/login', loginUser);
usuarioRouter.post('/logout', logoutUser);
usuarioRouter.get('/perfil', authUser, perfil);
// usuarioRouter.get('/', getUser);
usuarioRouter.put('/:id', putUser);


module.exports = usuarioRouter