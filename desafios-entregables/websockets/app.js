const express = require('express');
const fetch = require('node-fetch');
const http = require('http');
const bodyParser = require('body-parser');
const upload = require('./middlewares/uploadFiles');
const fs = require('fs');
const fsp = fs.promises; // usamos el modulo de promesas para asegurarnos que todos los metodos se corren de manera asincrona
const app = express();
const defaultPort = 8080;
const port = process.env.port || defaultPort;
const moment = require('moment');
const { engine } = require('express-handlebars');

const server = http.createServer(app);
const { Server } = require('socket.io');
// const cors = require('cors');

const io = new Server(server);

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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
    // leemos el archivo Messageos.json y lo guardamos su contenido en una variable
    const fileBuffer = await fsp.readFile(
      './services/mensajes.json',
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
        const products = await getProducts();
        const lastProd = products.at(-1);
        const newProdId = parseInt(lastProd.id) + 1;
        const data = req.body;
        if (data && Object.keys(data).length !== 0) {
          data.id = newProdId;
          products.push(data);
          await postProduct(products);
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
      const messages = await getMessages();
      const data = req.body;
      if (Object.keys(data).length !== 0) {
        data.date = moment().format('DD/MM/YYYY HH:MM:SS');
        console.log('data2', data);
        messages.push(data);
        await postMessage(messages);
        const newMessages = await getMessages();
        console.log(newMessages);
        res.json(newMessages);
      } else {
        res.json({ error: 'producto no encontrado' });
      }
    } catch (err) {
      res.status(400).json({ error: err });
    }
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
