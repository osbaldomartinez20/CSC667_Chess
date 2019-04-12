//This file is used to connect to the mySQL database
//It also creates mySQL pools

const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'chess-mysql.cmaf5ugscgcc.us-west-2.rds.amazonaws.com',
    user: 'group9',
    password: 'chess667',
    database: 'chess_game'
});


module.exports = db;