const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const usersRouter = require('./users');

router.get('/', (req, res) => {
  res.send('Index Api');
});

/** Auth route */
router.use('/auth', authRouter);

/** Users Route */
router.use('/users', usersRouter);

module.exports = router;
