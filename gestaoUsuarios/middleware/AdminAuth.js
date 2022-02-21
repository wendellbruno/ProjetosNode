const jwt = require('jsonwebtoken')
const secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

module.exports =  (req,res,next) =>{
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        try{
            const bearer = authToken.split(' ')
            const token = bearer[1]
    
            const decoded = jwt.verify(token,secret)
            if(decoded.role == 1){
                next();
            }else{
                res.status(404);
                res.send('Você não tem permissão para isso')
            }
           
        }catch(erro){
            console.log(erro)
        }
    }else{
        res.status(403);
        res.send("você não está autenticado");
        return;
    }
}