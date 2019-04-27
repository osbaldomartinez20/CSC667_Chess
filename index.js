const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const games = require('../Database/chat.js');
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

//important.. this line creates a connection to use static files such as html saved in the
//folder public

app.use(express.static(__dirname + '/views'));


app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
    response.sendFile('/views/index.html', { root: __dirname })
})
const nsp = io.of("/" + games.getGameID());
nsp.on('connection', function(socket) {
    console.log('an user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
        io.emit('new message', ' *disconnected*');
    });
});

nsp.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        console.log(msg);
        nsp.emit('chat message', msg);
    });
});


const router = require('./controllers/login.js')
app.use(router)

http.listen(3000, () => {
    console.log("Server is up and listening on 3000...")
})