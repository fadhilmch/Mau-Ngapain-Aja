var express = require('express');
var router = express.Router();
const { create, findAll, findById, update, destroy, sendEmail, addTimeline } = require('../controllers/todos.controller');


router.post('/:id', create);
router.get('/', findAll);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', destroy);
router.post('/sendemail/:id', sendEmail)
router.get('/addtimeline/:id', addTimeline)


module.exports = router;
