const express = require('express');
const router = express.Router();
const productos = require('./products');

//usa el archivo products.js para manejar todo
//lo que este en el endpoint /api/productos
router.use('/', productos);

module.exports = router;
