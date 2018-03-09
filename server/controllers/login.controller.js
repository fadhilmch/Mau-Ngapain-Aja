const jwt = require('jsonwebtoken');
const User = require('../models/users.model')

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
