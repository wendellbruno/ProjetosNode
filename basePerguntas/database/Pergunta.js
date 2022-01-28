const Sequelize = require('sequelize')
const connection = require('./database')

//isso vai virar uma tabela no bd
const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then( () => console.log('tabela Pergunta criada'))

module.exports = Pergunta;