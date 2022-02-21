const bodyParser = require('body-parser')
const express = require('express');
const router = require('./routes/routes');
const app = express();
//const homeController = require('./controllers/HomeControllers')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', router)

app.listen(8686,()=>{
    console.log('Servidor iniciado')
})