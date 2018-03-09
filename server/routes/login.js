const express = require('express')
const router = express.Router()

const {loginFB,logout} = require('../controllers/login.controller')

router.post('/fb', loginFB)
router.post('/out',logout)

module.exports = router
