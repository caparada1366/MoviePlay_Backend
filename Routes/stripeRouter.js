const { Router } = require('express');
const postCarrito = require('../controllers/stripe/stripeController')

const stripeRouter = Router();


stripeRouter.post('/', postCarrito);

module.exports = stripeRouter;