const express = require('express');
const multer = require('multer');
const UserController = require('../controllers/UserController');
const UserRequest = require('../request/UserRequest');

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/avatars');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.multerError = 'The avatar field should be a jpg,jpeg,png or gif';
      cb(null, false);
    }
  },
});

/* GET users listing. */
router.get('/', UserController.index);
router.post('/', upload.single('avatar'), UserRequest, UserController.store);
router.patch('/:id', upload.single('avatar'), UserRequest, UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;
