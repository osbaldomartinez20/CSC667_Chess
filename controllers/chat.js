const express = require('express')
const db = require('../auth/db_config.js')
const bodyParser = require('body-parser')

const chatRouter = express.Router()

router.use(bodyParser.urlencoded({
    extended: false
}))
router.use(bodyParser.json())


