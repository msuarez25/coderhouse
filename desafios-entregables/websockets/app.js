import express from 'express';
import fetch from 'node-fetch';
import http from 'http';
import bodyParser from 'body-parser';
import fs from 'fs';
const fsp = fs.promises; // usamos el modulo de promesas para asegurarnos que todos los metodos se corren de manera asincrona
const app = express();
const defaultPort = 8080;
const port = process.env.port || defaultPort;
import moment from 'moment';
import { engine } from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import knex from './DB/db.js';

const server = http.createServer(app);
import { Server } from 'socket.io';
// const cors = require('cors');

const io = new Server(server);

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const postProduct = async (data) => {
  try {
    await knex.insert(data).from('productos');
    return true;
  } catch (error) {
    console.log(error);
  }
};
const getProducts = async () => {
  try {
    const productos = await knex.select().from('productos');
    console.log(productos);
    return productos;
  } catch (error) {
    console.log(error);
  }
};
const postMessage = async (data) => {
  try {
    // leemos el archivo mensajes.json y lo guardamos su contenido en una variable
    await fsp.writeFile(
      './services/mensajes.json',
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
const getMessages = async () => {
  try {
    const mensajes = await knex.select().from('mensajes');
    return mensajes;
  } catch (error) {
    console.log(error);
  }
  // finally {
  //   knex.destroy();
  // }
};

app
  .route('/')
  .get((req, res) => {
    (async () => {
      try {
        const products = await getProducts();
        const messages = await getMessages();
        res.render('main', {
          products,
          messages,
        });
      } catch (err) {
        res.status(400).json(err);
      }
    })();
  })
  .post((req, res) => {
    (async () => {
      try {
        const data = req.body;
        if (data && Object.keys(data).length !== 0) {
          await postProduct(data);
          const newProducts = await getProducts();
          console.log(newProducts);
          res.json(newProducts);
        } else {
          res.json({ error: 'producto no encontrado' });
        }
      } catch (err) {
        res.status(400).json({ error: err });
      }
    })();
  });

app.route('/mensajes').post((req, res) => {
  (async () => {
    try {
      const data = req.body;
      if (Object.keys(data).length !== 0) {
        data.date = moment().format('DD/MM/YYYY HH:MM:SS');
        console.log('mydata: ', data);
        const response = await knex.insert(data).from('mensajes');
        console.log('✔ Mensaje agregado');
        console.log(response);
        const newMessages = await getMessages();
        res.json(newMessages);
      } else {
        res.json({ error: 'Tu mensaje no pudo ser agregado' });
      }
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   knex.destroy();
    // }
  })();
});

io.on('connection', (socket) => {
  // Mensaje de bienvenida cuando se conecta un cliente nuevo
  console.log('💻 Nuevo usuario conectado!');

  socket.on('disconnect', () => {
    console.log('❌ Usuario desconectado');
  });

  //Recibimos los mensajes desde el frontend
  socket.on('formularioEnviado', (data) => {
    (async function () {
      if (data.formData) {
        fetch('http://localhost:8080', {
          method: 'post',
          body: JSON.stringify(data.formData),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            // console.log(json);
            io.sockets.emit('productoAgragado', json);
          })
          .catch((error) => console.log('error:', error));
      } else {
        io.sockets.emit('productoError', {
          error: 'El producto no pudo ser agregado',
        });
      }
    })();
  });

  //Recibimos los mensajes desde el frontend
  socket.on('mensajeEnviado', (data) => {
    // console.log(data);
    (async function () {
      if (data.formData) {
        fetch('http://localhost:8080/mensajes', {
          method: 'post',
          body: JSON.stringify(data.formData),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => {
            // console.log(res);
            return res.json();
          })
          .then((json) => {
            // console.log(json);
            io.sockets.emit('mensajeAgragado', json);
          })
          .catch((error) => console.log('error:', error));
      } else {
        io.sockets.emit('mensajeError', {
          error: 'El mensaje no pudo ser agregado',
        });
      }
    })();
  });
});

app.set('views', './views');
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

server.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
