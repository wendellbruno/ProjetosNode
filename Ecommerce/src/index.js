const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/router')


require('dotenv').config()


mongoose.connect(process.env.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}, console.log('Connected to databse'))


app.use(cors())
app.use(express.json())
app.use(routes)



app.listen(3333, () =>{
    console.log('Server running')
})