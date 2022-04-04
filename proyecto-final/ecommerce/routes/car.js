import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import {
  getProducts,
  postProdCar,
  getProdCar,
} from '../services/fsFunctions.js';
import logger from '../middlewares/logger.js';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router
  .route('/')
  .get((req, res) => {
    (async () => {
      try {
        const products = await getProdCar();
        if (products !== null) {
          res.json(products);
        } else {
          res.json({ error: 'Carrito Vacio' });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  })
  .post(logger, (req, res) => {
    (async () => {
      try {
        const carrito = await getProdCar();
        let newProdId = 1;
        if (carrito.length > 0) {
          const maxId = carrito.reduce(
            (max, product) => (product.id > max ? product.id : max),
            carrito[0].id
          );
          newProdId = parseInt(maxId) + 1;
        }
        const newCarrito = {
          id: newProdId,
          timestamp: Date.now(),
          productos: [],
        };
        carrito.push(newCarrito);
        await postProdCar(carrito);
        res.json(newCarrito);
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  });

router.route('/:id').delete(logger, (req, res) => {
  (async () => {
    try {
      const products = await getProdCar();
      const prodID = parseInt(req.params.id);
      const data = req.body;
      const productsExist = products.filter((obj) => {
        return parseInt(obj.id) === prodID;
      });

      if (data !== '' && productsExist.length > 0) {
        const productsExclID = products.filter((obj) => {
          return parseInt(obj.id) !== prodID;
        });
        await postProdCar(productsExclID);
        res.json(productsExclID);
      } else {
        res.json({ error: 'producto no encontrado' });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  })();
});

router.route('/:id/productos').get((req, res) => {
  const carritoId = req.params.id;
  if (carritoId) {
    (async () => {
      try {
        const carritos = await getProdCar();
        let carritoById = carritos.filter((i) => carritoId.includes(i.id));
        if (carritoById.length > 0) {
          res.json(carritoById);
        } else {
          res.json({ error: 'producto no encontrado' });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  } else {
    res.json({ error: 'El usuario no tiene carrito asignando' });
  }
});

router
  .route('/:id/productos/:id_prod')
  .post(logger, (req, res) => {
    const carritoId = req.params.id;
    const prodId = req.params.id_prod;
    if (prodId) {
      (async () => {
        try {
          const products = await getProducts();
          const productById = products.filter((i) => prodId.includes(i.id));
          const carritos = await getProdCar();

          if (carritoId && carritoId) {
            carritos.forEach((carrito) => {
              if (carrito.id == carritoId) {
                carrito.productos.push(productById[0]);
              }
            });
            await postProdCar(carritos);
            res.json(carritos);
          } else {
            res.json({ error: 'El producto no ha sido agragado al carrito' });
          }
        } catch (err) {
          res.status(400).json(err);
        }
      })();
    } else {
      res.status(400).json({ error: 'No se encontro el ID del producto' });
    }
  })
  .delete(logger, (req, res) => {
    (async () => {
      try {
        const carritos = await getProdCar();
        const carId = parseInt(req.params.id);
        const prodId = parseInt(req.params.id_prod);

        if (carritos && carId && prodId) {
          carritos.every((carrito, index) => {
            if (carrito.id == carId) {
              console.log(carrito.productos);
              carritos[index].productos = carrito.productos.filter(
                (prod) => prod.id !== prodId
              );
              return false;
            }
            return true;
          });
          await postProdCar(carritos);
          res.json(carritos);
        } else {
          res.json({ error: 'producto no encontrado' });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  });

export default router;
