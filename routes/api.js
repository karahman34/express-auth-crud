const express = require('express');

const router = express.Router();
const usersRouter = require('./users');

router.get('/', (req, res) => {
  res.send('Index Api');
});

/** Users Route */
router.use('/users', usersRouter);

module.exports = router;
