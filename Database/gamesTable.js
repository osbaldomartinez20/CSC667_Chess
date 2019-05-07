//database
var db = require('../auth/db_config.js');

//used to get the user id and display_name
var userFunc = require('../Database/user.js');

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
    var sql = "UPDATE games SET player_two_id = ?, active = true WHERE game_id = ?";
    db.query(sql, [userid, game_id], function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//marks the game as complete in database
exports.gameComplete = function(game_id, user1, user2, won, callback) {
    var sql = "UPDATE games SET complete = true, active = false WHERE game_id = ?";
    db.query(sql, [game_id], function(err, result) {
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
            console.log("Cannot fetch available games: " + err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//helps finding ongoing games
exports.fetchOngoingGames = function(callback) {
    db.query("SELECT player_one_id, player_two_id FROM games WHERE active = true AND complete = false", function(err, result) {
        if (err) {
            console.log("Cannot fetch ongoing games: " + err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.fetchUserGames = function(username, callback) {
    var storing = [];
    userFunc.getUserId(username, function(err, result) {
        if (err) {
            console.log(err);
            //callback(err, null);
        } else {
            console.log(result);
            var user_id = result;
            var sql = "SELECT * FROM games WHERE player_one_id = " + user_id + " OR player_two_id = " + user_id + "";
            db.query(sql, function(err, result) {
                if (err) {
                    console.log("Cannot fetch user games: " + err);
                    callback(err, null);
                } else {
                    let counter = result.length;
                    for (var i = 0; i < result.length; i++) {
                        let opponent;
                        let game_id = result[i].game_id;
                        let active = result[i].active;
                        if (result[i].player_one_id == user_id) {
                            if (result[i].player_two_id == null || result[i].player_two_id == 'undefined') {
                                opponent = 0;
                            } else {
                                opponent = result[i].player_two_id;
                            }
                        } else if (result[i].player_two_id == user_id) {
                            if (result[i].player_one_id == null || result[i].player_one_id == 'undefined') {
                                opponent = 0;
                            } else {
                                opponent = result[i].player_one_id;
                            }
                        }
                        userFunc.getUserName(opponent, function(err, res) {
                            if (err) {
                                console.log(err);
                            } else {
                                storing.push(new userGameData(game_id, res, active));
                                if (storing.length >= counter) {
                                    callback(null, JSON.stringify(storing));
                                }
                            }
                        });
                    }
                }
            });
        }
    });
}

//class helps organize sent data in fetchUserGames()
var userGameData = class {
    constructor(game_id, opponent, isActive) {
        this.opponent = opponent;
        if (isActive == 1) {
            this.isActive = true;
        } else {
            this.isActive = false;
        }
        this.game_id = game_id;
    }
}

//returns the currnt state of the game
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
var updateState = function(game_id, curr_state, callback) {
    var sql = "UPDATE games SET current_state = '" + curr_state + "' WHERE game_id = " + game_id + "";
    db.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//stores moves in database in table game_moves
//data must contain: user_id, type of piece, original position of piece, where piece is moving to, and game_id
exports.storeMove = function(data) {
    var mv = JSON.parse(data.moves);
    var piece = mv.color + "" + mv.piece;
    var sql = "INSERT INTO game_moves (game_id, origin, dest, flags, piece, san) VALUES (" + data.game_id + ", '" + mv.from + "', '" + mv.to + "', '" + mv.flags + "', " + piece + ",  '" + mv.san + "')";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("Cannot store message: " + err)
        } else {
            console.log("Message storage successful");
            updateState(data.game_id, data.state, function(err, result) {
                if (err) {
                    console.log("There was an error: " + err);
                } else {
                    console.log("Success in storing moves and game state.")
                }
            });
        }
    });
}