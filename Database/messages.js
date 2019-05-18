//database
var db = require('../auth/db_config.js');

//this method stores messages in the database given game_id, message, and user_id
exports.storeMessage = function(data) {
    var sql = "INSERT INTO chat (chat_id, messages, display_name) VALUES ('" + data.chat_id + "', '" + data.message + "', '" + data.user + "')";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("Cannot store message: " + err)
        } else {
            console.log("Message storage successful");
        }
    });
}


//returns all the messages of the chat given the chat_id
exports.getMessages = function(chat_id, callback) {
    var sql = "SELECT chat_insert_date, display_name, messages FROM chat WHERE chat_id = '" + chat_id + "' ORDER BY chat_insert_date ASC LIMIT 50";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("Cannot retrieve messages: " + err);
            callback(err, null);
        } else {
            callback(null, JSON.stringify(result));
        }
    });
}