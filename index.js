const express = require('express')
const app = express()

//important.. this line creates a connection to use static files such as html saved in the
//folder public
app.use(express.static('./views'))

app.get('/', (req, res) => {
    //res.send('Hey')
    res.sendFile('/views/index.html', { root: __dirname })
})

app.listen(3000, () => console.log('Server is running on port 3000'))