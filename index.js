const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var cors = require('cors');

//important.. this line creates a connection to use static files such as html saved in the
//folder public

app.use(express.static(__dirname + '/views'));
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
    response.sendFile('/views/index.html', { root: __dirname })
})

var rooms = "";
io.on('connection', function(socket) {
    console.log('an user connected');
    socket.on('room', function(room) {
        socket.join(room)
        rooms = room;
        console.log("room: " + room);
    })

});

io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        console.log(msg);
        io.to(rooms).emit('message', msg);
    });
});

io.on('disconnect', function() {
    console.log('user disconnected');
    io.to(rooms).emit('new message', ' *disconnected*');
});

const router = require('./controllers/login.js')
app.use(router)

http.listen(3000, () => {
    console.log("Server is up and listening on 3000...")
})