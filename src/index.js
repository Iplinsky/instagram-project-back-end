const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server) // Feito o import do socket.io passando como parâmetro o server que suporta requisições HTTP    

mongoose.connect('mongodb+srv://Thiago:Thiago@cluster0-qelqd.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

// Middleware personalizado
app.use((req, res, next) => {
    req.io = io // => expandindo o (io) por toda a aplicação

    next() // => next possibilita o prosseguimento na chamada dos métodos abaixo
})

app.use(cors())

// app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

server.listen(3333)