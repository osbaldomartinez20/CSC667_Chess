const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//important.. this line creates a connection to use static files such as html saved in the
//folder public
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
    response.sendFile('/views/index.html', { root: __dirname })
})

const router = require('./controllers/login.js')
app.use(router)

app.listen(3000, () => console.log('Server is running on port 3000'))