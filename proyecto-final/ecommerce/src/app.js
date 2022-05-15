import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
const app = express();
import apiRouter from './routes/index.route.js';
import InfoRoute from './routes/info.route.js';
import minimist from 'minimist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for parsing multipart/form-data
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/public/views/layout',
    partialsDir: __dirname + '/public/views/partials',
  })
);

//usa el archivo index.js para manejar todo
//lo que este en el endpoint /api
app.use('/api', apiRouter);

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

// info
app.use('/info', new InfoRoute());

// Set Default port and alias for PORT
const options = {
  default: {
    PORT: '3000',
  },
  alias: {
    p: 'PORT',
  },
};
// check if args bring port
const args = minimist(process.argv.slice(2), options);
// set port
const PORT = args.PORT;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${PORT}, http://localhost:${PORT}`);
});
