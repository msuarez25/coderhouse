const express = require('express');
const router = express.Router();
const mensajes = require('./mensajes');

//usa el archivo products.js para manejar todo
//lo que este en el endpoint /api/mensajes
router.use('/', mensajes);

module.exports = router;
