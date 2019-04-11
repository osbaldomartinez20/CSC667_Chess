const express = require('express')
const login =  require('/controller/login.js')
const app = express()

//important.. this line creates a connection to use static files such as html saved in the
//folder public
app.use(express.static(__dirname + '/views'));

app.get('/', (request, response) => {
    response.sendFile('/views/index.html', { root: __dirname })
})

app.post('/login', (request, response) => { 
    login.verify(request)
})

app.get('/lobby', (request, response) => {
    response.sendFile('/views/lobby.html', {root: __dirname })
})

app.listen(3000, () => console.log('Server is running on port 3000'))
