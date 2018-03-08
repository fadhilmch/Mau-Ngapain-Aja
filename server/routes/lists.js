var express = require('express');
var router = express.Router();
const { create, findAll, findById, update, destroy } = require('../controllers/lists.controller');

router.post('/:todoId', create);
router.get('/', findAll);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
