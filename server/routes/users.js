const express = require('express');
const router = express.Router();
const { timelineFB } = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/timeline', timelineFB)

module.exports = router;
