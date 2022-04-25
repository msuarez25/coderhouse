import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = process.env.port || 8080;
import api from './routes/index.route.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for parsing multipart/form-data
app.use(express.static(__dirname + '/public'));

//usa el archivo index.js para manejar todo
//lo que este en el endpoint /api
app.use('/api', api);

// Public URLs
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});
app.get('/productos', (req, res) => {
  res.sendFile(__dirname + '/public/views/productos.html');
});
app.get('/carrito', (req, res) => {
  res.sendFile(__dirname + '/public/views/carrito.html');
});
app.get('/editar/:id', (req, res) => {
  res.sendFile(__dirname + '/public/views/editar-producto.html');
});
app.get('/agregar', (req, res) => {
  res.sendFile(__dirname + '/public/views/agregar-producto.html');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}, http://localhost:${port}`);
});
