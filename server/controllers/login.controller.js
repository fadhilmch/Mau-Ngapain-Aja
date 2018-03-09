const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const bcrypt = require('bcrypt');

module.exports = {
    loginFB (req,res){
        const idFB = req.body.idFB
        const email = req.body.email
        const fbToken = req.body.fbToken

        User.findOne({'email':email})
        .then(dataUser=>{
            if(dataUser){
                const token = jwt.sign({email:dataUser.email,fbToken: fbToken},'secret-ui')
                res.status(200).json({
                    dataUser,
                    token:token
                })
            }else{
                const newUser = new User({
                    email:email,
                    facebook_id:idFB
                })

                newUser.save((err,data)=>{
                    const token = jwt.sign({email:dataUser.email,fbToken: fbToken},'secret-ui')
                    res.status(200).json({
                        token: token,
                        dataUser:data
                    })
                })
            }
        })
    },
    login (req, res){
        User.findOne({'email':req.body.email})
            .then(data=>{
                if(data){
                    let check = bcrypt.compareSync(req.body.password, data.password);
                    if(check){
                        var token = jwt.sign({ id: data.id, email: data.email, name: data.name }, 'secret-ui');
                        res.status(200).json({
                            message: 'Signin success',
                            user: {
                                id: data.id,
                                email: data.email,
                                name: data.name,
                                token: token
                            }
                        })
                    }
                   }else{
                       res.status(404).json({
                           message: 'user not found'
                       })
                   }
            })
    },
    logout(req,res){
        const token = req.body.token
        const decode = jwt.verify(token,'secret-ui')

        User.findOne({'email':email})
        .then(dataUser=>{
            if(dataUser){
                const token = jwt.sign({email:dataUser.email,fbToken: fbToken},'secret-ui')
                res.status(200).json({
                    dataUser,
                    token:token
                })
            }else{
                const newUser = new User({
                    email:email,
                    facebook_id:idFB
                })

                newUser.save((err,data)=>{
                    const token = jwt.sign({email:dataUser.email,fbToken: fbToken},'secret-ui')
                    res.status(200).json({
                        token: token,
                        dataUser:data
                    })
                })
            }
        })
    },
    logout(req,res){
        const token = req.body.token
        const decode = jwt.verify(token,'secret-ui')

    }

}
