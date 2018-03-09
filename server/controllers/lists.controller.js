const List = require('../models/lists.model');

module.exports = {
    create: (req, res) => {
        List.create({
            title: req.body.title,
        }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to create list'
                })
            }
            res.status(200).json({
                message: 'List created',
                data
            })
        })
    },
    addTodo: (req, res) => {
        List.findOne({
            _id : req.params.id
        })
        .exec()
        .then((data) => {
            let updateTodo = data.todo;
            updateTodo.push(req.params.idTodo)
            List.findByIdAndUpdate(req.params.id,{
                todo: updateTodo,
            }, {new :true}, (err, data) => {
                if (err) {
                    return res.status(400).json({
                        message: 'Failed to add todo'
                    })
                }
                res.status(200).json({
                    message: 'Todo added',
                    data
                })
            })
        })
    },
    findAll: (req, res) => {
        List.find()
        .populate('todo')
        .exec()
        .then((data) => {
            res.status(200).json({
                message : 'Success get all data !',
                data
            })
        })
        .catch(err => {
            res.status(400).json({
                message : 'Failed to get all data !'
            })
        })
    },
    findById: (req, res) => {
        List.findOne({
            _id : req.params.id
        })
        .populate('todo')
        .exec()
        .then((data) => {
            res.status(200).json({
                message : 'Success get data !',
                data
            })
        })
        .catch(err => {
            res.status(400).json({
                message : 'Failed to get data !'
            })
        })
    },
    update: (req, res) => {
        List.findByIdAndUpdate(req.params.id,{
            title: req.body.text,
        }, {new :true}, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to update list'
                })
            }
            res.status(200).json({
                message: 'List updated',
                data
            })
        })
    },
    destroy: (req, res) => {
        List.remove({_id: req.params.id}, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to delete list'
                })
            }
            res.status(200).json({
                message: 'List deleted',
            })
        })
    }
}
