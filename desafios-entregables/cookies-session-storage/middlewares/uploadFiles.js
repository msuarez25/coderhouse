import multer from 'multer';
import storage from '../services/storage.js';

const upload = multer({ storage: storage });

export default upload;
