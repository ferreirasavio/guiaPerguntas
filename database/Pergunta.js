const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('pergunta', { // para criar uma conexão com a sua tabela
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao :{
        type: Sequelize.TEXT,
        allowNull: false
    }
}) 

Pergunta.sync({force: false})//criar uma tabela no banco de dados caso não exista
    .then(() => {

    }) 

module.exports = Pergunta