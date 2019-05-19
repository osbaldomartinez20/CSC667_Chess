const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var cors = require('cors');
const message = require('./Database/messages.js');
const moves = require('./Database/gamesTable');
//array to store name of all online users for lobbby chat
lobby_users = [];

//important.. this line creates a connection to use static files such as html saved in the
//folder public

app.use(express.static(__dirname + '/views'));
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
    response.sendFile('/views/index.html', { root: __dirname })
})

io.on('connection', function(socket) {
    var room = socket.handshake['query']['rooms'];
    socket.join(room);

    function updateUserNames() {
        io.to(room).emit('usernames', lobby_users);
    };

    function updateCounter() {
        io.to(room).emit('count', io.engine.clientsCount);
    };
    
    socket.on('newGame', function(msg) {
        // console.log(msg);
        io.emit('newGame', msg);
    });

    socket.on('username', function(data) {
        updateCounter();

        socket.nickname = data;
        if (lobby_users.indexOf(data) == -1) {
            lobby_users.push(data);
        }
    });

    socket.on('disconnect', function() {
        socket.leave(room)

        if (room == 'lobby') {
            io.to(room).emit('new message', ' *disconnected*');
            updateCounter();
        } else {
            io.to(room).emit('new message', ' *disconnected*');
        }

    });

    socket.on('message', function(msg) {
        message.storeMessage(msg);
        io.to(room).emit('message', msg);
    });

    socket.on('move', function(msg) {
        moves.storeMove(msg);
        io.to(room).emit('move', msg);
    });
});

const router = require('./controllers/login.js')
app.use(router)

http.listen(3000, () => {
    console.log("Server is up and listening on 3000...")
})
