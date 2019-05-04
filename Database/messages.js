//database
var db = require('../auth/db_config.js');

//this creates a new entry in the chat table
exports.newMessageTracker = function (game_id) {
    var sql = "INSERT INTO chat (chat_id) VALUES (" + game_id + ")";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("Failed to make a message tracker for game: " + game_id + ": " + err);
        } else {
            console.log("Can track messages of game: " + game_id);
        }
    });
}

var messageStructure = class {
    constructor(user_name, message, timestamp) {
        this.user_name = user_name;
        this.message = message;
        this.timestamp = timestamp;
    }
}

var dummyData = class {
    constructor(user_name, message, game_id) {
        this.user_id = user_name;
        this.message = message;
        this.game_id = game_id;
    }
}


//this method stores messages in the database given game_id, message, and user_id
exports.storeMessage = function (data) {
    var t_stamp = new Date().getDay;
    var sql = "INSERT INTO chat (chat_id, messages, user_id) VALUES (" + data.game_id + ", '" + data.message + "', '" + data.user + "')";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("Cannot store message: " + err)
        } else {
            console.log("Message storage successful");
        }
    });
}


//returns all the messages of the chat given the chat_id
exports.getMessages = function (chat_id, callback) {
    var sql = "SELECT chat_insert_date, user_id, messages FROM chat WHERE chat_id = " + chat_id + " ORDER BY chat_insert_date DESC LIMIT 200";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("Cannot retrieve messages: " + err);
            callback(err, null);
        } else {
            console.log("Message retrieval success" + '\n' + JSON.stringify(result));
            callback(null, result);
        }
    });
}
