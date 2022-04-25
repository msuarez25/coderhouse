const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 8080;
const productos = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

//usa el archivo index.js para manejar todo
//lo que este en el endpoint /api
app.use('/productos', productos);

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/index.html');
  res.render('pages/main');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
