//database
var db = require('../auth/db_config.js');

//create a new game by giving the username
exports.createNewGame = async function (userid, callback) {
    //this is used to asign an unique id to each game.
    var time = new Date();
    var game_id = time.getTime();
    var sql = "INSERT INTO games (game_id, player_one_id, active, complete) VALUES (" + game_id + ", '" + userid + "', false , false)";
    db.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, game_id);
        }
    });
}

//function used to join a game given an username and a game_id
exports.joinGame = async function (userid, game_id, callback) {
    var sql = "Update games SET player_two_id = '" + userid + "', active = true WHERE game_id = " + game_id + "";
    db.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//"class" used to organized the retrieved date when finding available games
exports.availableData = class {
    constructor(game_id, playerid) {
        this.game_id = game_id;
        this.playerid = playerid;
    }
}

//"class" used to organized the retrieved date when finding ongoing games
exports.ongoingData = class {
    constructor(game_id, playerid, player2id) {
        this.game_id = game_id;
        this.playerid = playerid;
        this.player2id = player2id;
    }
}

//helps finding available games
exports.fetchAvailableGames = function (callback) {
    db.query("SELECT game_id, player_one_id FROM games WHERE active = false AND complete = false", function (err, result) {
        if (err) {
            callback(err, null);
        } else
            callback(null, result);
    });
}

exports.fetchOngoingGames = function (callback) {
    db.query("SELECT game_id, player_one_id, player_two_id FROM games WHERE active = true AND complete = false", function (err, result) {
        if (err) {
            callback(err, null);
        } else
            callback(null, result);
    });
}
