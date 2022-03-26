const express = require('express');
import upload from '../middlewares/uploadFile.js';
const router = express.Router();

router.post('/uploadFile', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('File not found');
    return next(error);
  }
  res.send(file);
});
module.exports = router;
