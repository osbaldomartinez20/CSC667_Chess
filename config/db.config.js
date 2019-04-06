//This file is used to connect to the mySQL database
//It also creates mySQL pools

const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'oz123!',
    database: 'mydb'

});


module.exports = db;