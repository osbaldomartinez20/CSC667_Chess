//database
var db = require('../auth/db_config.js');

//used for message tracker
var chat = require('../Database/messages.js');

//create a new game by giving the username
exports.createNewGame = async function(userid, callback) {
    //this is used to asign an unique id to each game.
    var time = new Date();
    var game_id = time.getTime();
    var sql = "INSERT INTO games (game_id, player_one_id, active, complete) VALUES (" + game_id + ", '" + userid + "', false , false)";
    db.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, JSON.stringify(game_id));
        }
    });
}

//function used to join a game given an username and a game_id
exports.joinGame = async function(game_id, userid, callback) {
    console.log(userid)
    var sql = "UPDATE games SET player_two_id = '" + userid + "', active = true WHERE game_id = " + game_id + "";
    db.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.getPlayers = async function(game_id, callback) {
    var sql = "SELECT player_one_id, player_two_id FROM games WHERE game_id = '" + game_id + "' AND active = true";
    db.query(sql, function(err, result) {
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
exports.fetchAvailableGames = function(callback) {
    db.query("SELECT game_id, player_one_id FROM games WHERE active = false AND complete = false", function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//helps finding ongoing games
exports.fetchOngoingGames = function(callback) {
    db.query("SELECT game_id, player_one_id, player_two_id FROM games WHERE active = true AND complete = false", function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//returns the moves made throughout the game
exports.boardState = function(game_id, callback) {
    db.query("SELECT current_state FROM games WHERE game_id = " + game_id + "", function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result[0].current_state);
        }
    });
}

//updates the current state of the board in the database
exports.updateState = function(game_id, curr_state, callback) {
    var sql = "UPDATE games SET current_state = '" + curr_state + "' WHERE game_id = " + game_id + "";
    db.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//used to help make the process of storing the moves easier
var moves = class {
    constructor(playerid, piece, origin, moveTo, timestamp) {
        this.playername = playerid;
        this.piece = piece;
        this.origin = origin;
        this.moveTo = moveTo;
        this.timestamp = timestamp;
    }
}

//creates dummy data for testing
var dummyData = class {
    constructor(playerid, piece, origin, moveTo, game_id) {
        this.playername = playerid;
        this.piece = piece;
        this.origin = origin;
        this.moveTo = moveTo;
        this.game_id = game_id;
    }
}


//stores moves in database in table game_moves
//data must contain: user_id, type of piece, original position of piece, where piece is moving to, and game_id
exports.storeMove = function(data) {
    var storing = [];
    var t_stamp = new Date();
    var sql = "SELECT * FROM game_moves WHERE game_id = " + data.game_id + "";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("Cannot retrieve moves: " + err);
        } else {
            console.log(JSON.parse(result[0].moves));
            var mov = JSON.parse(result[0].moves);
            if (mov != null) {
                for (let i = 0; i < mov.length; i++) {
                    storing.push(new moves(mov[i].playername, mov[i].piece, mov[i].origin, mov[i].moveTo, mov[i].timestamp));
                }
            }
            storing.push(new moves(data.playername, data.piece, data.origin, data.moveTo, t_stamp));
            var st = JSON.stringify(storing);
            db.query("UPDATE game_moves SET moves = '" + st + "' WHERE game_id = " + data.game_id + "", function(err, result) {
                if (err) {
                    console.log("Cannot update moves: " + err)
                } else {
                    console.log("Move update successful");
                }
            });
        }
    });
}

var startTrackingMoves = function(game_id) {
    var sql = "INSERT INTO game_moves (game_id) VALUES (" + game_id + ")";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("Failed to assing a move tracker to game: " + game_id + ": " + err);
        } else {
            console.log("Can track moves of game: " + game_id);
        }
    });
}

//var sec = new dummyData("ozo", "T", "B5", "A5", 123);
//storeMove(sec);