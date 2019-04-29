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
        this.user_name = user_name;
        this.message = message;
        this.game_id = game_id;
    }
}

exports.storeMessage = function (data) {
    var storing = [];
    var t_stamp = new Date().toLocaleString();
    console.log(t_stamp);
    var sql = "SELECT * FROM chat WHERE chat_id = " + data.game_id + "";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("Cannot retrieve messages: " + err);
        } else {
            console.log("Messages retrieved. " + result[0].messages);
            var mess = JSON.parse(result[0].messages);
            storing.push(new messageStructure(data.user_name, data.message, t_stamp));
            if (mess != null) {
                for (var i = 0; i < mess.length; i++) {
                    storing.push(new messageStructure(mess[i].user_name, mess[i].message, mess.timestamp));
                }
            }
            var st = JSON.stringify(storing);
            db.query("UPDATE chat SET messages = '" + st + "' WHERE chat_id = " + data.game_id + "", function (err, result) {
                if (err) {
                    console.log("Cannot store message: " + err)
                } else {
                    console.log("Message storage successful");
                }
            });
        }
    });
}


//returns all the messages of the chat given the chat_id
var getMessages = function (chat_id) {
    var sql = "SELECT * FROM chat WHERE chat_id = " + chat_id + "";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("Cannot retrieve messages: " + err);
            return "Cannot retrieve messages: " + err;
        } else {
            console.log("Message retrieval success" + '\n' + result[0].messages);
        }
    });
}

//getMessages(123);