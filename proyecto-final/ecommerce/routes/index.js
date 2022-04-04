import express from 'express';
import productos from './products.js';
import car from './car.js';
const router = express.Router();

//usa el archivo products.js para manejar todo
//lo que este en el endpoint /api/productos
router.use('/productos', productos);

//usa el archivo car.js para manejar todo
//lo que este en el endpoint /api/carrito
router.use('/carrito', car);

export default router;
