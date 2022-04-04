import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import upload from '../middlewares/uploadFiles.js';
import logger from '../middlewares/logger.js';
import { v4 as uuidv4 } from 'uuid'; // usamos para generar codigos unicos
import { postProduct, getProducts } from '../services/fsFunctions.js';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router
  .route('/')
  .get((req, res) => {
    (async () => {
      try {
        const products = await getProducts();
        res.json(products);
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  })
  .post(logger, upload.single('foto'), (req, res) => {
    (async () => {
      try {
        const products = await getProducts();
        const maxId = products.reduce(
          (max, product) => (product.id > max ? product.id : max),
          products[0].id
        );
        const newProdId = parseInt(maxId) + 1;
        const data = req.body;
        const file = req.file;
        if (data !== '') {
          data.id = newProdId;
          data.timestamp = Date.now();
          data.code = `prod-${uuidv4()}`;
          data.foto = file.path.replace('public', '');
          products.push(data);
          await postProduct(products);
          res.redirect(`/productos/?prodId=newProdId`);
        } else {
          res.json({ error: 'producto no encontrado' });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  });

router
  .route('/:id')
  .get((req, res) => {
    (async () => {
      try {
        const products = await getProducts();
        const prodID = parseInt(req.params.id);

        const productById = products.filter((obj) => {
          return parseInt(obj.id) === prodID;
        });
        if (productById.length > 0) {
          res.json(productById);
        } else {
          res.json({ error: 'producto no encontrado' });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  })
  .put(logger, (req, res) => {
    (async () => {
      try {
        const products = await getProducts();
        const prodID = parseInt(req.params.id);
        const data = req.body;
        let productById = products.filter((obj) => {
          return parseInt(obj.id) === prodID;
        });
        if (data !== '' && productById.length > 0) {
          const productsExclID = products.filter((obj) => {
            return parseInt(obj.id) !== prodID;
          });
          productById = productById[0];
          productById = { ...productById, ...data };
          productsExclID.push(productById);
          await postProduct(productsExclID);
          res.json(productsExclID);
        } else {
          res.json({ error: 'producto no encontrado' });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  })
  .delete(logger, (req, res) => {
    (async () => {
      try {
        const products = await getProducts();
        const prodID = parseInt(req.params.id);
        const data = req.body;
        const productsExist = products.filter((obj) => {
          return parseInt(obj.id) === prodID;
        });

        if (data !== '' && productsExist.length > 0) {
          const productsExclID = products.filter((obj) => {
            return parseInt(obj.id) !== prodID;
          });
          await postProduct(productsExclID);
          res.json(productsExclID);
        } else {
          res.json({ error: 'producto no encontrado' });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  });

export default router;
