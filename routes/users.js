const express = require('express');
const UserController = require('../controllers/UserController');
const UserRequest = require('../request/UserRequest');

const router = express.Router();

/* GET users listing. */
router.get('/', UserController.index);
router.post('/', UserRequest, UserController.store);
router.patch('/:id', UserRequest, UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;
