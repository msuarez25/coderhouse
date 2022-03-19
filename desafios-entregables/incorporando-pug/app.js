const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 8080;
const productos = require('./routes/index');
const { query } = require('pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/productos', productos);

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/index.html');
  res.render('main', {
    title: 'Agregar Producto',
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
