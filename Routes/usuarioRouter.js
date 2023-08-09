const {Router} = require('express')
const {postUser} = require('../controllers/postUser')
const {getUser} = require('../controllers/getUser')
const {putUser} = require('../controllers/putUser')

const usuarioRouter = Router()

usuarioRouter.post('/', postUser)
usuarioRouter.get('/', getUser)
usuarioRouter.put('/:id', putUser)

module.exports = usuarioRouter