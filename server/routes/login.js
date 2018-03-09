const express = require('express')
const router = express.Router()

const {loginFB, login, logout} = require('../controllers/login.controller')

router.post('/fb', loginFB)
router.post('/out',logout)
router.post('/', login)

module.exports = router
