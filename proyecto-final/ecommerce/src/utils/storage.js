import multer from 'multer';

const FILE_TYPE_MAP = {
  // mime type
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, filename);
  },
});

export default storage;
