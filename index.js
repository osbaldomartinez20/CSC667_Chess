const express = require('express')
const app = express()

//important.. this line creates a connection to use static files such as html saved in the
//folder public
app.use(express.static(__dirname + '/views'));

app.get('/', (request, response) => {
    response.sendFile('/views/index.html', { root: __dirname })
})

app.post('/login', (request, response) => { 
    //this will be a script that returns the user_id token
    //and the page to redirec to in a json file
})

app.get('/lobby', (request, response) => {
    response.sendFile('/views/lobby.html', {root: __dirname })
})

app.listen(3000, () => console.log('Server is running on port 3000'))
