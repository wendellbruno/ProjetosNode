const Sequelize = require('sequelize')
const connection = new Sequelize('baseperguntas', 'root', 'suasenhaqui',{
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = connection