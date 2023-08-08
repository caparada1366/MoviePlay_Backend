const {Router} = require('express')
const {postUser} = require('../controllers/postUser')
const {getUser} = require('../controllers/getUser')

const usuarioRouter = Router()

usuarioRouter.post('/', postUser)
usuarioRouter.get('/', getUser)

module.exports = usuarioRouter