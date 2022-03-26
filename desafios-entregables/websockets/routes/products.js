const express = require('express');
const bodyParser = require('body-parser');
const upload = require('../middlewares/uploadFiles');
const router = express.Router();
const fs = require('fs');
const { dirname } = require('path');
const fsp = fs.promises; // usamos el modulo de promesas para asegurarnos que todos los metodos se corren de manera asincrona

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
//router.use(upload.array());

const postProduct = async (data) => {
  try {
    // leemos el archivo productos.json y lo guardamos su contenido en una variable
    await fsp.writeFile(
      './services/productos.json',
      JSON.stringify(data),
      'utf-8',
      (error) => {
        // en caso de error en la lectura del archivo aparecerá este mensaje
        if (error) throw `error: error de escritura, ${error.toString()}`;
      }
    );
    // Retorna la respuesta objeto js como json
    return true;
  } catch (error) {
    // el bloque catch sirve para atajar cualquier error y mostrarlo en la consola
    return error;
  }
};
const getProducts = async () => {
  try {
    // leemos el archivo productos.json y lo guardamos su contenido en una variable
    const fileBuffer = await fsp.readFile(
      './services/productos.json',
      'utf8',
      (error) => {
        // en caso de error en la lectura del archivo aparecerá este mensaje
        if (error) throw `error: error de lectura, ${error.toString()}`;
      }
    );
    // Retorna la respuesta objeto js como json
    return JSON.parse(fileBuffer);
  } catch (error) {
    // el bloque catch sirve para atajar cualquier error y mostrarlo en la consola
    return error;
  }
};

router
  .route('/')
  .get((req, res) => {
    (async () => {
      try {
        const products = await getProducts();
        res.render('product', {
          products,
        });
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  })

  .post(upload.single('uploaded_file'), (req, res) => {
    (async () => {
      try {
        const products = await getProducts();
        const lastProd = products.at(-1);
        const newProdId = parseInt(lastProd.id) + 1;
        const data = req.body;
        const file = req.file;
        if (data !== '') {
          data.id = newProdId;
          data.thumbnail = file.filename;
          products.push(data);
          await postProduct(products);
          res.json({ prodId: newProdId });
          // res.redirect('/');
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
  .put((req, res) => {
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
  .delete((req, res) => {
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

module.exports = router;
