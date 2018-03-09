const User  = require('../models/users.model')

module.exports = {
    getUserData(req,res){
        res.status(200).json({
            message: 'hello'
        })
    }
}