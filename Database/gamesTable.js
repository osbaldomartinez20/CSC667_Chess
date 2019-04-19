//database
var db = require('../auth/db_config.js');

//create a new game by giving the username
var createNewGame = async function (user) {
    var playerid;
    db.query("SELECT user_id FROM users WHERE display_name = '" + user + "'", function (err, result) {
        if (err) {
            console.log("cannot retrieve ELO: " + err);
            return false;
        } else {
            playerid = JSON.parse(JSON.stringify(result))[0].user_id;
            //this is used to asign an unique id to each game.
            var time = new Date();
            var game_id = time.getTime();
            var sql = "INSERT INTO games (game_id, player_one_id, active, complete) VALUES (" + game_id + ", '" + playerid + "', false , false)";
            db.query(sql, function (err, result) {
                if (err) {
                    console.log("failed to create game " + err);
                    return false;
                } else {
                    console.log("game created");
                }
            });
        }
    });
}

//function used to join a game given an username and a game_id
var joinGame = function (user, game_id) {
    db.query("SELECT user_id FROM users WHERE display_name = '" + user + "'", function (err, result) {
        if (err) {
            console.log("cannot retrieve ELO: " + err);
            return false;
        } else {
            playerid = JSON.parse(JSON.stringify(result))[0].user_id;
            var sql = "Update games SET player_two_id = '" + playerid + "', active = true WHERE game_id = " + game_id + "";
            db.query(sql, function (err, result) {
                if (err) {
                    console.log("failed to join game " + err);
                    return false;
                } else {
                    console.log("joined game");
                }
            });
        }
    });
}

//"class" used to organized the retrieved date when finding available games
class availableData {
    constructor(game_id, playerid) {
        this.game_id = game_id;
        this.playerid = playerid;
    }
}

//helps finding available games
var fetchAvailableGames = function (data, callback) {
    db.query("SELECT game_id, player_one_id FROM games WHERE active = false AND complete = false", function (err, result) {
        if (err) {
            callback(err, null);
        } else 
            callback(null, result);
    });
}

//sends data with available games 
var availableGames = function() {
    var a_games = [];
    var data = null;
    fetchAvailableGames(data, function(err, result) {
        if (err) {
            console.log("There was an error retrieving available games: " + err);
            return false;
        } else {
            for (var i = 0; i < Object.keys(result).length; i++) {
                const temp = new availableData(result[i].game_id, result[i].player_one_id);
                a_games.push(temp);
            }
            console.log(JSON.stringify(a_games));
        }
    });
}
