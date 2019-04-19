//database
var db = require('../auth/db_config.js');

//initiate a new game
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
