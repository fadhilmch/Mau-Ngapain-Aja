var express = require('express');
var router = express.Router();
const { create, findAll, findById, update, destroy, addTodo } = require('../controllers/lists.controller');

router.post('/', create); 
router.post('/:id/todo/:idTodo', addTodo)

router.get('/', findAll);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
