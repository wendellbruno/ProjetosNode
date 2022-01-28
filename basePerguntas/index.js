const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const port = 8181;
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
//dataBase
connection.authenticate()
.then( () =>{
    console.log('conectado no bando de dados')
})
.catch((erro) => {
    console.log(erro)
})

app.listen(port,()=> {
    console.log('servidor iniciado')
})

//motor do html ejs
app.set('view engine', 'ejs');
//bodyparser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// para usar arquivos staticos.
app.use(express.static('public'))

//rotas
app.get('/',(req,res) =>{
    Pergunta.findAll({
        raw: true,
        order: [
            ['id','DESC'] // ORDENA PELO ID DESCENTE
        ] //puxa apenas os dados. 
    }).then(perguntas =>{
        res.render('index',{
            perguntas: perguntas
        })
    })
    
})

app.get("/perguntar",(req,res) =>{
    res.render('perguntar')
})
// esse salvar pergunta essa parte da cadeia de "perguntar" renderizado a cima.
app.post("/salvarpergunta",(req,res) =>{
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{
        res.redirect('/')
    })
})

//buscando por id
app.get("/pergunta/:id", (req,res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where: { id:id }
    }).then( pergunta =>{
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then( resposta =>{
                res.render('pergunta',{
                    pergunta: pergunta,
                    resposta: resposta
                })
            })


           
        }else{
            res.redirect('/')
        }
    })
})

app.post("/responder", (req,res) =>{
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    console.log(corpo, perguntaId)
    Resposta.create({
        corpo : corpo,
        perguntaId: perguntaId
    }).then( () =>{
        res.redirect("/pergunta/"+perguntaId)
    })
})