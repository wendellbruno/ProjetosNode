class HomeController{
    async index(req,res){
        res.send("APP EXPRESS - GUIA PROGRAMADOR")
    }
}

module.exports = new HomeController();