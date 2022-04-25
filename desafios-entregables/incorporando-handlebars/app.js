const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 8080;
const productos = require('./routes/index');
const { engine } = require('express-handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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

//usa el archivo index.js para manejar todo
//lo que este en el endpoint /api
app.use('/productos', productos);

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/index.html');
  res.render('main');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
