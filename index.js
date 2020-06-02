const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require ('./database/Pergunta')
const Resposta = require('./database/Resposta')

//database
connection
    .authenticate()
    .then(() =>{
        console.log('conexão feita com o banco de dados')
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

app.set('view engine', 'ejs') //dizendo para que o express use o ejs como view engine
app.use(express.static('public'))// ler os arquivos estaticos
//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//rotas
app.get('/', (req,res) => {
    Pergunta.findAll({raw: true, order:[
        ['id','desc']
    ]}).then(perguntas => { 
         res.render('index', {
            perguntas: perguntas
         })
        })
    
})

app.get('/perguntas',(req,res) => {
    res.render('perguntas', {
        
    })
})

app.post('/salvarpergunta', (req,res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao : descricao
    }).then(() => {
        res.redirect('/')
    }) // seria o insert into que damos no banco de dados    
})

app.get('/pergunta/:id', (req,res) => {
    var id = req.params.id
    Pergunta.findOne({ 
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                    ['id', 'DESC']
                ]
            }).then(respostas =>{
                res.render('pergunta',{
                    pergunta: pergunta,
                    respostas: respostas
                })
            } )

           
        }else {
            res.redirect('/')
        }
    })
})

app.post('/responder', (req,res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' +perguntaId)
    })
})

app.listen(8000,()=>{
    console.log('app rodando')
})