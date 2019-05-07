const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var cors = require('cors');
const message = require('./Database/messages.js');
//aray to store name of all online users for lobbby chat
lobby_users = [];

//important.. this line creates a connection to use static files such as html saved in the
//folder public

app.use(express.static(__dirname + '/views'));
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
    response.sendFile('/views/index.html', { root: __dirname })
})

var rooms = '';
var onPlayers = [];
var nsp = io.of('/default');



nsp.on('connection', function(socket) {
    console.log('an user connected');

    function updateUserNames() {
        nsp.emit('usernames', lobby_users);
    }

    nsp.on('username', function(data) {
        nsp.username = data;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        if (lobby_users.indexOf({ Opponent: nsp.username }) == -1) {
            lobby_users.push({ Opponent: nsp.username });
            updateUserNames();
        }
=======
        lobby_users.push({ Opponent: nsp.username });
        console.log(lobby_users);
        //  updateUserNames();
>>>>>>> 1ca3f2fa66bae61a35fb004ab52f182ebd8dcbe1
=======
        lobby_users.push({ Opponent: nsp.username });
        updateUserNames();
>>>>>>> parent of 689b52d... online player re: lobby chat updated for testing
=======
        lobby_users.push({ Opponent: nsp.username });
        updateUserNames();
>>>>>>> parent of 689b52d... online player re: lobby chat updated for testing
    })
})


nsp.on('connection', function(socket) {
    socket.on('message', function(msg) {
        console.log(msg);
        message.storeMessage(msg);
        nsp.emit('message', msg);
    });
})

nsp.on('connection', function(socket) {
    socket.on('newGame', function(msg) {
        console.log(msg);
        nsp.emit('newGame', msg);
    });
});

nsp.on('connection', function(socket) {
    socket.on('disconnect', function() {
        console.log('user disconnected');
        nsp.emit('new message', ' *disconnected*');
        //lobby_users.splice(lobby_users.indexOf(nsp.Opponent.username), 1);
        // updateUserNames();
    });
});

var nsp2 = io.of('/private');
nsp2.on('connection', function(socket) {
    console.log('an user connected');
    socket.on('room', function(room) {
        socket.join(room)
        rooms = room;
        console.log("room: " + room);
    })

});

nsp2.on('connection', function(socket) {
    socket.on('message', function(msg) {
        console.log(msg);
        nsp2.to(rooms).emit('message', msg);
    });
});

nsp2.on('connection', function(socket) {
    socket.on('move', function(msg) {
        console.log(msg);
        moves.storeMove(msg);
        nsp2.to(rooms).emit('move', msg);
    });
});


io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        console.log(msg);
        io.to('default').emit('message', msg);
    });
});

/*io.on('disconnect', function() {
    console.log('user disconnected');
    io.to(rooms).emit('new message', ' *disconnected*');
});*/

const router = require('./controllers/login.js')
app.use(router)

http.listen(3000, () => {
    console.log("Server is up and listening on 3000...")
})