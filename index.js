const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var cors = require('cors');
const message = require('./Database/messages.js');
const moves = require('./Database/gamesTable');
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

var nsp = io.of('/default').clients();

nsp.on('connection', function(socket) {
            console.log('an user connected');

            /*   function updateUserNames() {
        nsp.emit('usernames', lobby_users);
    }
    nsp.on('connection', function(socket) {

        socket.on('new_user', function(data) {
            console.log("username: " + data);
            // nsp.name = data;
            console.log('an user connected');
            socket.on('usernames', function(data) {
                //nsp.name = data;
                if (lobby_users.indexOf(data) == -1) {
                    console.log("username: " + data);
                    lobby_users.push(data);
                    updateUserNames();
                    nsp.emit('usernames', lobby_users);
                }
            })
        })

        nsp.on('connection', function(socket) {
            socket.on('disconnect', function() {
                console.log('user disconnected');
                nsp.emit('new message', ' *disconnected*');
                lobby_users.splice(lobby_users.indexOf(nsp.name), 1);
                updateUserNames();
            });
        });
    });
});*/



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

            socket.on('disconnect', function() {
                console.log('user disconnected');
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
                console.log('user joined room #' + room);

                socket.on('disconnect', function() {
                    socket.leave(room)
                    console.log('user disconnected');
                });

                socket.on('message', function(msg) {
                    console.log(msg);
                    message.storeMessage(msg);
                    io.to(room).emit('message', msg);
                });

                socket.on('move', function(msg) {
                    console.log(msg);
                    moves.storeMove(msg);
                    io.to(room).emit('move', msg);
                });
            });

            const router = require('./controllers/login.js')
            app.use(router)

            http.listen(3000, () => {
                console.log("Server is up and listening on 3000...")
            })