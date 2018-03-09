const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const FB = require('fb');
const jwt = require('jsonwebtoken');


const {sendMail} = require('../helpers/sendmail')


module.exports = {
    getUserData(req,res){
        res.status(200).json({
            message: 'hello'
        })
    },
    register: (req, res) => {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : hash
        }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    message : err
                })
            }
            res.status(200).json({
                message : 'User registered',
                data    : user
            })
        })
    },
    timelineFB(req,res){
        let fb = new FB.Facebook()
        
        const token = req.headers.token
        const decode = jwt.verify(token,'secret-ui')
        console.log(decode.fbToken)
        fb.setAccessToken(decode.fbToken);
        
        
        var body = req.headers.content
        fb.api('me/feed', 'post', { message: body }, function (res) {
            console.log(res)
        // if(!res || res.error) {
        //     console.log(!res ? 'error occurred' : res.error);
        //     return;
        // }
        });
    },
    

}
