var bodyParser = require('body-parser'),
    http       = require('http'),
    express    = require('express')
    datos       = require('./Datos')
    socketio   = require('socket.io')

var port       = port = process.env.PORT || 3000,
    app        = express(),
    Server     = http.createServer(app)
    io         = socketio(Server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/datos', datos)
app.use(express.static('public'))

io.on('connection', function(socket, chat){
  console.log('socket conectado');
})

Server.listen(port, function(){
  console.log("Escuchando en puerto: "+ port);
})
