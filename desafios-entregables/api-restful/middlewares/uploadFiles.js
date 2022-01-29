const multer = require('multer');
const storage = require('../services/storage.js');

const upload = multer({ storage });

module.exports = upload;
