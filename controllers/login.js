const express = require('express')
const https = require('https');
const db = require('../auth/db_config.js')
const user = require('../Database/user.js')
const bodyParser = require("body-parser")
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('1032027183995-9ejqlmjsu33kjhhh1rdhcl085kklrlrc.apps.googleusercontent.com');

//create a router for url request
const router = express.Router()

//to parse Json on receiven or request
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.post('/login', (request, response) => {
    var token = request.body.idtoken
    console.log("the id token is " + token)
        //    verify(id_token)
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '1032027183995-9ejqlmjsu33kjhhh1rdhcl085kklrlrc.apps.googleusercontent.com'
        })
        const payload = ticket.getPayload()
        const user_id = payload['sub']
        const email = payload['email']

        console.log("here " + payload)
        console.log("user_id " + user_id)
        console.log("email " + email)
        if (user.userExists(user_id)) {
            console.log("user exists already")
            response.send(user_id)
        } else {
            console.log("creating user")
            user.createUser(user_id, email)
            console.log("user created")
            response.send(user_id)
        }
    }
    verify().catch(console.error);
})

module.exports = router