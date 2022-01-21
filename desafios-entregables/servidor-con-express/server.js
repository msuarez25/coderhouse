// server.js
// where your node app starts
const express = require('express');
const app = express();

const fs = require('fs');
const fsp = fs.promises; // usamos el modulo de promesas para asegurarnos que todos los metodos se corren de manera asincrona

// pagina default
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// Devuelve array de productos disponibles
app.get('/productos', (request, response) => {
  (async () => {
    try {
      // leemos el archivo productos.json y lo guardamos su contenido en una variable
      const fileBuffer = await fsp.readFile(
        './productos.json',
        'utf8',
        (error) => {
          // en caso de error en la lectura del archivo aparecerá este mensaje
          if (error) throw `error: error de lectura, ${error.toString()}`;
        }
      );
      // Retorna la respuesta objeto js como json
      response.json(JSON.parse(fileBuffer));
    } catch (error) {
      // el bloque catch sirve para atajar cualquier error y mostrarlo en la consola
      console.log(error);
    }
  })();
});

// Devuelve un producto elegido al azar de los disponibles
app.get('/productoRandom', (request, response) => {
  (async () => {
    try {
      // leemos el archivo productos.json y lo guardamos su contenido en una variable
      const fileBuffer = await fsp.readFile(
        './productos.json',
        'utf8',
        (error) => {
          // en caso de error en la lectura del archivo aparecerá este mensaje
          if (error) throw `error: error de lectura, ${error.toString()}`;
        }
      );
      // En caso de tener un string que represente un json, podemos usar el metodo JSON.parse para convertirlo en un objeto javascript valido y operar con sus propiedades
      const products = JSON.parse(fileBuffer);
      // Funcion para Calcular un numero al azar entre dos intervalos
      const randomNumFromInterval = (min, max) => {
        // El resultado incluye el min y el max
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      // Retorna la respuesta objeto js como json del procutos
      // y usamos la funcion randomNumFromInterval para devolver solo uno de los productos elegido al azar.
      response.json(products[randomNumFromInterval(0, products.length - 1)]);
    } catch (error) {
      // el bloque catch sirve para atajar cualquier error y mostrarlo en la consola
      console.log(error);
    }
  })();
});

// listen for requests :)
const listener = app.listen(8080, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
