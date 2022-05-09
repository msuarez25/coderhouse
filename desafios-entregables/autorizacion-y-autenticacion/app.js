import express from 'express';
import fetch from 'node-fetch';
import http from 'http';
import bodyParser from 'body-parser';
import fs from 'fs';
import { MensajeModule } from './services/database/modules/mensajes.modules.js';
import generateProductos from './utils/productos.utils.js';
import generateMensajes from './utils/mensajes.utils.js';
const fsp = fs.promises; // usamos el modulo de promesas para asegurarnos que todos los metodos se corren de manera asincrona
const app = express();
const defaultPort = 8080;
const port = process.env.port || defaultPort;
import moment from 'moment';
import { engine } from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
dotenv.config();

import './services/database/config/db.js';
import AuthRouter from './routes/auth.router.js';
import passport from './utils/passport.util.js';
import * as AuthMiddleware from './middlewares/auth.middleware.js';

const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser(process.env.SECRET));

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: Number(process.env.EXPIRE),
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);

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

app.use(passport.initialize());
app.use(passport.session());
app.use('/', AuthRouter);

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
    return productos;
  } catch (error) {
    console.log(error);
  }
};

const getFakeProducts = async () => {
  try {
    const productos = [];

    for (let index = 0; index < 5; index++) {
      productos.push(generateProductos());
    }

    // console.log(productos);
    return productos;
  } catch (error) {
    console.log(error);
  }
};

const getFakeMensajes = async () => {
  try {
    const mensajes = [];

    for (let index = 0; index < 5; index++) {
      mensajes.push(generateMensajes());
    }

    // console.log(mensajes);
    return mensajes;
  } catch (error) {
    console.log(error);
  }
};

const postMessage = async (data) => {
  try {
    if (data !== '') {
      // console.log('post: ', data);
      const mensajes = await MensajeModule.create(data);
      // console.log('mensaje: ', mensajes);
      return mensajes;
    }
    return false;
  } catch (error) {
    // el bloque catch sirve para atajar cualquier error y mostrarlo en la consola
    return error;
  }
};

const getMessages = async () => {
  try {
    const mensajes = await MensajeModule.find();
    return mensajes;
  } catch (error) {
    console.log(error);
  }
};

// app.get('/api/productos-test', (req, res) => {
//   (async () => {
//     try {
//       const products = await getFakeProducts();
//       const messages = await getMessages();
//       res.render('producto-test', {
//         products,
//         messages,
//         url: 'http://localhost:8080',
//       });
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   })();
// });

app.get('/api/mensajes-test', (req, res) => {
  (async () => {
    try {
      const messages = await getFakeMensajes();
      await postMessage(messages);
      res.redirect('/');
    } catch (err) {
      res.status(400).json(err);
    }
  })();
});

app.get('/', AuthMiddleware.checkAuthentication, (req, res) => {
  (async () => {
    try {
      // const products = await getProducts();
      const oriMessages = await getMessages();

      const messages = [];

      oriMessages.forEach((msg) => {
        let date = new Date(msg.date);
        date = moment(date).format('DD/MM/YYYY');
        messages.push({
          email: msg.author.email,
          text: msg.text,
          date: date,
          alias: msg.author.alias,
          avatar: msg.author.avatar,
        });
      });

      const nombre = req.signedCookies.user.nombre;
      const email = req.signedCookies.user.email;

      res.render('main', {
        messages,
        nombre,
        email,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  })();
});

// app.get('/login', (req, res) => {
//   (async () => {
//     try {
//       res.render('login');
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   })();
// });

// app.post('/api/login', (req, res) => {
//   (async () => {
//     try {
//       const { nombre } = req.body;
//       if (nombre !== null) {
//         req.session.login = true;
//         res
//           .clearCookie('nombre')
//           .cookie('nombre', nombre, { maxAge: 600000, signed: true })
//           .redirect('/');
//       } else {
//         res
//           .status(400)
//           .send('Hubo un error en su sesión, por favor intentelo de nuevo.');
//       }
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   })();
// });

// app.get('/logout', (req, res, next) => {
//   // Leer cookie para el nombre
//   const nombre = req.signedCookies.nombre;
//   req.session.destroy((err) => {
//     if (!err) {
//       res.status(200).clearCookie('nombre').render('bye', {
//         nombre,
//       });
//     } else {
//       res.json(err);
//     }
//   });
// });

app.post('/mensajes', (req, res) => {
  // console.log(req.body);
  (async () => {
    try {
      const data = req.body;

      if (Object.keys(data).length !== 0) {
        await postMessage(data);
        const newMessages = await getMessages();
        res.json(newMessages);
      } else {
        res.json({ error: 'Tu mensaje no pudo ser agregado' });
      }
    } catch (error) {
      console.log(error);
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
      if (data) {
        fetch('http://localhost:8080/mensajes', {
          method: 'post',
          body: JSON.stringify(data.message),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => {
            // console.log(res);
            return res.json();
          })
          .then((json) => {
            console.log(json);
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

server.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
