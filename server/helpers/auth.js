const jwt = require('jsonwebtoken');

module.exports = {
    authlogin(req,res,next){
        if(req.headers.token){
            const token = req.headers.token
            const decode = jwt.verify(token,'secret-ui')
            next()
        }else{
            next('error')
        }
        
    }
}