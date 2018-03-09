const express = require('express');
const router = express.Router();
const { register } = require('../controllers/register.controller');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', register);

module.exports = router;
