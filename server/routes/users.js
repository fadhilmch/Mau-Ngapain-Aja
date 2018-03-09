const express = require('express');
const router = express.Router();
const { register, timelineFB } = require('../controllers/users.controller');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', register);
router.get('/timeline', timelineFB)



module.exports = router;
