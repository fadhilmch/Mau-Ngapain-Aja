var express = require('express');
var router = express.Router();

const {authlogin} = require('../helpers/auth')
const {getUserData} = require('../controllers/users.controller')


/* GET home page. */
router.get('/', authlogin ,getUserData)

module.exports = router;
