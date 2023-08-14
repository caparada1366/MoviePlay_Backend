const { Router } = require('express');
const getMovsYSeriesXuser = require('../controllers/ordenesCompra/getMovsYSeriesXuser');

const ordenCompraRouter = Router();

ordenCompraRouter.get('/', getMovsYSeriesXuser);



module.exports = ordenCompraRouter;