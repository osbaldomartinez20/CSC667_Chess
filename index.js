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

//var nsp = io.of();

io.on('connection', function(socket) {
    //          console.log('an user connected');
    socket.join('lobby');

    function updateUserNames() {
        io.to('lobby').emit('usernames', lobby_users);
    }

    // socket.on('connection', function(socket) {
    //    console.log("33");
    //  socket.on('new_user', function(data) {
    //     console.log("username: " + data + "34");
    //     socket.nickname = data;
    //     console.log('an user connected ' + socket.nickname + "36");
    socket.on('username', function(data) {
            socket.nickname = data;
            if (lobby_users.indexOf(data) == -1) {
                console.log("username: " + data + "40");
                lobby_users.push(data);
                io.to('lobby').emit('username', lobby_users);
            }
        })
        //  })


    socket.on('disconnect', function() {
        // console.log('user disconnected');
        io.to('lobby').emit('new message', ' *disconnected*');
        lobby_users.splice(lobby_users.indexOf(socket.nickname), 1);
        updateUserNames();
    });
});



/*nsp.on('connection', function(socket) {
    socket.on('message', function(msg) {
        // console.log(msg);
        message.storeMessage(msg);
        io.emit('message', msg);
    });
})

nsp.on('connection', function(socket) {
    socket.on('newGame', function(msg) {
        // console.log(msg);
        io.emit('newGame', msg);
    });
});

io.on('connection', function(socket) {
    socket.on('disconnect', function() {
        //console.log('user disconnected');
    });

});

//var io = io.of('/private');
/*io.on('connection', function(socket) {
    console.log('an user connected');
    socket.on('room', function(room) {
        socket.join(room)
        rooms = room;
        console.log("room: " + room);
    })

});*/

io.on('connection', function(socket) {
    var room = socket.handshake['query']['rooms'];
    socket.join(room);
    // console.log('user joined room #' + room);

    function updateUserNames() {
        io.to(room).emit('usernames', lobby_users);
    };

    socket.on('username', function(data) {
        socket.nickname = data;
        if (lobby_users.indexOf(data) == -1) {
            console.log("username: " + socket.nickname + "40");
            lobby_users.push(data);
            io.to(room).emit('username', lobby_users);
        }
    });

    socket.on('disconnect', function() {
        socket.leave(room)
        if (room == 'lobby') {
            io.to(room).emit('new message', ' *disconnected*');
            lobby_users.splice(lobby_users.indexOf(socket.nickname), 1);
            updateUserNames();
        } else {
            io.to(room).emit('new message', ' *disconnected*');
        }

    });

    socket.on('message', function(msg) {
        // console.log(msg);
        message.storeMessage(msg);
        io.to(room).emit('message', msg);
    });

    socket.on('move', function(msg) {
        //console.log(msg);
        moves.storeMove(msg);
        io.to(room).emit('move', msg);
    });
});

const router = require('./controllers/login.js')
app.use(router)

http.listen(3000, () => {
    console.log("Server is up and listening on 3000...")
})