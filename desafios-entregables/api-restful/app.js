const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 8080;
const api = require('./routes/index');
//const upload = require('./middlewares/uploadFiles');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//for parsing multipart/form-data
//app.use(upload.array());
app.use(express.static('public'));

//usa el archivo index.js para manejar todo
//lo que este en el endpoint /api
app.use('/api', api);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
