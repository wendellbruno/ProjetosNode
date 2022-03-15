const appointment = require('../models/Appointment')
const mongoose = require('mongoose')
const AppointmentFactory = require('../factories/AppointmentFactory')
const mailer = require('nodemailer')

const Appo = mongoose.model('Appointment', appointment)

class AppointmentService {

    async create(name, email, description, cpf, date, time){
        const newAppo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
        });
        try{
            await newAppo.save();
            console.log('salvo com sucesso')
            return true;
        }catch(erro){
            console.log(erro)
            return false;
        }

    }

    async getAll(showFinished){
        if(showFinished){
            return await Appo.find()
        }else{
            const appos = await Appo.find({'finished': false})
            const appointments = []
            appos.forEach(appointment => {
                appointments.push(AppointmentFactory.build(appointment))
            });
            return appointments;
        }
    }

    async getById(id){
        try{
            const event = Appo.findOne({'_id' : id})
            return event
        }catch(erro){
            console.log(erro)
        }
    } 



    async finish(id){
        try{
            await Appo.findByIdAndUpdate(id,{finished: true})
            return true;
     }catch(erro){
         console.log(erro)
            return false;
     }
    }

    //query -> email ou cpf
    async search(query){

        try{
            const appos = await Appo.find().or([{email: query},{cpf: query}])
            console.log(appos)
        }catch(erro){
            console.log(erro)
            return []
        }
    }

    async sendNotification(){
        const appos = await this.getAll(false);

        const transporter = mailer.createTransport({
            host: 'host do email aqui',
            port: 'porta do email',
            auth: {
                user: 'user',
                password: 'password'
            }
        });

        appos.forEach( async app =>{
            const date = app.start.getTime();
            const hour = 1000 * 60 * 60
            const gap = date-Date.now();

            if(gap <= hour){
                
                if(!app.notified){
                   await app.findByIdAndUpdate(app.id,{notified: true})

                    transporter.sendMail({
                        from: 'seu email aqui',
                        to: app.email,
                        subject: 'sua consulta vai acontecer em breve',
                        text: 'conteudo do email.'
                    }).then( () =>{
                        
                    }).catch(erro => {
                        console.log(erro)
                    })
                }
            }

        })
    }

  
}

module.exports = new AppointmentService();

