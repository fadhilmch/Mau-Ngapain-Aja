const express = require('express');
const router = express.Router();
const {sendEmail} = require('../controllers/users.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sendemail', sendEmail)
module.exports = router;
