const { Router } = require('express');
const getMovsYSeriesXuser = require('../controllers/ordenesCompra/getMovsYSeriesXuser');
const getOcXUser = require('../controllers/ordenesCompra/getOCxUser');
const getAllOCs = require('../controllers/ordenesCompra/getAllOCs');

const ordenCompraRouter = Router();

ordenCompraRouter.get('/getTodoxUser', getMovsYSeriesXuser); /// recibe idUser por body
ordenCompraRouter.get('/getOCsxUser', getOcXUser);  /// recibe idUser por body
ordenCompraRouter.get('/getAllOCs', getAllOCs);


module.exports = ordenCompraRouter;