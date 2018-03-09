const Todo = require('../models/todos.model');
const List = require('../models/lists.model');
const {sendingMail} = require('../helpers/sendmail')

module.exports = {
    create: (req, res) => {
        Todo.create({
            text: req.body.text,
            due_date: req.body.due_date
        }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to create todo'
                })
            }
            List.findOne({
                _id : req.params.id
            })
            .exec()
            .then((list) => {
                console.log("List "+list)
                let updateTodo = list.todo;
                updateTodo.push(data._id)
                List.findByIdAndUpdate(req.params.id,{
                    todo: updateTodo,
                }, {new :true}, (err, list2) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'Failed to add todo'
                        })
                    }
                    res.status(200).json({
                        message: 'Todo added',
                        data:list2
                    })
                })
            })
        })
    },
    findAll: (req, res) => {
        Todo.find()
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: 'Success get all data !',
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: `Failed to get all data !`
                })
            })
    },
    findById: (req, res) => {
        Todo.findOne({
            _id: req.params.id
        })
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: 'Success get data !',
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: `Failed to get data !`
                })
            })
    },
    update: (req, res) => {
        Todo.findByIdAndUpdate(req.params.id, {
            text: req.body.text,
            due_date: req.body.due_date
        }, { new: true }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to update todo'
                })
            }
            res.status(200).json({
                message: 'Todo updated',
                data
            })
        })
    },
    destroy: (req, res) => {
        Todo.remove({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to delete todo'
                })
            }
            res.status(200).json({
                message: 'Todo deleted',
            })
        })
    },
    sendEmail: (req, res) => {
        console.log(req.params)
        const todoId = req.params.id
        console.log(todoId)
        List.findOne({'_id': todoId})
            .exec()
            .then(response => {
                const getTodo = response.todo.map(element => {
                    return new Promise ((resolve, reject) => {
                        Todo.findOne({'_id': element})
                            .exec()
                            .then(result => {
                                resolve(result)
                                // console.log(result)
                            })
                            .catch(err => {
                                reject(err)
                            })
                    })    
                })
                Promise.all(getTodo)
                    .then(allResult => {
                        console.log(allResult)
                        var text = `Title: ${response.title}` + '\n'

                        for (let i = 0; i < allResult.length; i++){
                            text +=  '- ' + allResult[i].text + '\n'
                        }
                        // subdomain emails must be registered in the API
                        sendingMail('herby.herado@gmail.com', text)
                        res.status(200).json({
                            message: 'email sent!'
                        })
                    })
            })
    },
    addTimeline: (req, res) => {
        const todoId = req.params.id
        List.findOne({'_id': todoId})
        .exec()
        .then(response => {
            const getTodo = response.todo.map(element => {
                return new Promise ((resolve, reject) => {
                    Todo.findOne({'_id': element})
                        .exec()
                        .then(result => {
                            resolve(result)
                            // console.log(result)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })    
            })
            Promise.all(getTodo)
                .then(allResult => {
                    console.log(allResult)
                    var text = `Title: ${response.title}` + '\n'

                    for (let i = 0; i < allResult.length; i++){
                        text +=  '- ' + allResult[i].text + '\n'
                    }
                    let fb = new FB.Facebook()
        
                    const token = req.headers.token
                    const decode = jwt.verify(token,'secret-ui')
                    console.log(decode.fbToken)
                    fb.setAccessToken(decode.fbToken);
                    
                    
                    var body = req.headers.content
                    fb.api('me/feed', 'post', { message: body }, function (res) {
                        console.log(res)
                    });
                    res.status(200).json({
                        message: 'facebok post sent!'
                    })
                })
        })
       
    }
}
