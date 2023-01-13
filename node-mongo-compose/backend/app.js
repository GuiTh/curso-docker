const express = require('express')
//serve para implementar webservices mais facil
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

//BANCO DE DADOS
//MONGOOSE USA API DE PROMISSES DO NODE
mongoose.Promise = global.Promise
//NOME DO SERVIDOR
mongoose.connect('mongodb://db/mydb')



server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cors())

//MAPEAMENTO OBJETO-DOCUMENTO
const Client = restful.model('Client',{
    name: { type: String, required: true }
})

//REST API
Client.methods(['get', 'post', 'put', 'delete'])

//VALIDA UPDATE
Client.updateOptions({new: true, runValidators: true})

//ROUTES
Client.register(server, '/clients')

//STARTA O SERVIDOR
server.listen(3000)