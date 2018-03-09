var express = require('express');
var router = express.Router();
const { create, findAll, findById, update, destroy, sendEmail } = require('../controllers/todos.controller');


router.post('/:id', create);
router.get('/', findAll);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', destroy);
router.post('/sendemail', sendEmail)

module.exports = router;
