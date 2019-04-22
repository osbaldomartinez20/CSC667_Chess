const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//var server = require('http').createServer(app);
var io = require('socket.io').listen(server);



//important.. this line creates a connection to use static files such as html saved in the
//folder public

app.use(express.static(__dirname + '/node_modules'));

app.use(express.static(__dirname + '/views'));


app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
    response.sendFile('/views/index.html', { root: __dirname })
})

app.get('/lobby', (request, response) => {
    response.send('SUCCESS in JS!');
})

const router = require('./controllers/login.js')
app.use(router)

app.listen(3000, () => {
    console.log("Server is up and listening on 3000...")
})