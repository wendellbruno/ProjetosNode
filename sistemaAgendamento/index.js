const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const appointmentService = require('./services/AppointmentService')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.set('view engine', 'ejs')

mongoose.connect('mongodb://127.0.0.1:27017/agendamento',{useNewUrlParser: true, useUnifiedTopology: true});
app.get('/', (req,res) =>{
    res.render('index')
})
app.get('/create',(req,res) =>{
    res.render('create')
})

app.get('/getCalendar', async (req,res) =>{
    const consults = await appointmentService.getAll(false)
    res.json(consults)
})

app.get('/event/:id', async(req,res) =>{
    const appointment = await appointmentService.getById(req.params.id)
    res.render('event', {appo: appointment})
})

app.post('/finish', async(req,res) =>{
    const id = req.body.id;
    try{
        const result = await appointmentService.finish(id)
        res.redirect('/')
    }catch(erro){
        console.log(erro)
    }
})

app.post('/create', async (req,res) =>{
    const consult = { ...req.body}
    const status = await appointmentService.create(
        consult.name, 
        consult.email, 
        consult.description, 
        consult.cpf,
        consult.date,
        consult.time
        )
    if(status){
        res.redirect('/')
    }else{
        res.send("Ocorreu uma falha")
    }    
})

app.get('/list', async(req,res) =>{
   // await appointmentService.search("000.000.000-00")
    const appos = await appointmentService.getAll(true);
    res.render('list',{appos})
})

app.get('/searchresult', async (req,res) =>{ 
    try{
        const appos = await appointmentService.search(req.query.search)
        res.render('list',{appos})

    }catch(erro){
        console.log(erro)
        return []
    }

const pullTime = 1000 * 60 * 5;

setInterval(async () =>{
        await appointmentService.sendNotification();
    },pullTime)
})

app.listen(8080, () => console.log('servidor iniciado'))