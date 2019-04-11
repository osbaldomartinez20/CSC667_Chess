const db = require('../auth/db_config.js')
const express = require('express')
const bodyParser = require("body-parser");

//create a router for url request
const router = express.Router()

//to parse Json on receiven or request
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.get('/login', (request, response) => {
    const id_token = request.query.id_token
    verify(id_token)
    const { OAuth2Client } = require('google-auth-library')
    const client = new OAuth2Client('80146750892-vh2nftso2rsa1h09ogk22qdd76ackhjh.apps.googleusercontent.com');

    async function verify(id_token) {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: '80146750892-vh2nftso2rsa1h09ogk22qdd76ackhjh.apps.googleusercontent.com',
        })
        const payload = ticket.getPayload()
        const user_id = payload['sub']

        console.log(payLoad)
        console.log(user_id)
    }
    verify().catch(console.error)
})