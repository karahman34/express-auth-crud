const app = require('express');
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const GuestMiddleware = require('../middleware/GuestMiddleware');
const LoginRequest = require('../request/LoginRequest');

const router = app.Router();

router.get('/me', AuthMiddleware, AuthController.me);
router.post('/login', GuestMiddleware, LoginRequest, AuthController.login);
router.post('/logout', AuthMiddleware, AuthController.logout);

module.exports = router;
