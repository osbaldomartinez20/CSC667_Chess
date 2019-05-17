//database
var db = require('../auth/db_config.js');

//used to get the user id and display_name
var userFunc = require('../Database/user.js');

//need rank update for completed games
var rankFunc = require('../Database/ranking.js');


//checks to see if someone sends an empty response.
//if empty response in query. Query gives error.
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

//create a new game by giving the username
//sends back a JSON with the game_id
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
//returns back the result from mysql.
exports.joinGame = async function(game_id, userid, callback) {
    var sql = "UPDATE games SET player_two_id = ?, active = true WHERE game_id = ? AND player_one_id <> ?";
    db.query(sql, [userid, game_id, userid], function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//marks the game as complete in database
//returns the result from the sql
exports.gameComplete = function(game_id, user1, user2, won, callback) {
    var sql = "UPDATE games SET complete = true, active = false WHERE game_id = ?";
    db.query(sql, [game_id], function(err, result) {
        if (err) {
            console.log("Cannot mark game as complete: " + err);
            callback(err, null);
        } else {
            rankFunc.updateEloRank(user1, user2, won);
            callback(null, result);
        }
    });
}

//gets the players from a game given the game_id
exports.getPlayers = async function(game_id, callback) {
    var sql = "SELECT player_one_id, player_two_id FROM games WHERE game_id = ? AND active = true";
    db.query(sql, [game_id], function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

///returns the available games
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

///returns the ongoing games
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

//returns the games of an user. Given the username.
exports.fetchUserGames = function(username, callback) {
    console.log("username " + username);
    var storing = [];
    var sql = "SELECT * FROM games WHERE player_one_id = ? OR player_two_id = ? ";
    db.query(sql, [username, username], function(err, result) {
        if (err) {
            console.log("Cannot fetch user games: " + err);
            callback(err, null);
        } else {
            let counter = result.length;
            for (let i = 0; i < result.length; i++) {
                let opponent = 0;
                let game_id = result[i].game_id;
                let active = result[i].active;
                let complete = result[i].complete;
                if (result[i].player_one_id == username) {
                    opponent = result[i].player_two_id;
                } else if (result[i].player_two_id == username) {
                    opponent = result[i].player_one_id;
                }

                storing.push(new userGameData(game_id, opponent, active, complete));
                if (storing.length >= counter) {
                    callback(null, JSON.stringify(storing));
                }
            }
        }
    });
}

//class helps organize sent data in fetchUserGames()
var userGameData = class {
    constructor(game_id, opponent, isActive, isComplete) {
        this.opponent = opponent;
        if (isActive == 1) {
            this.status = "Ongoing";
        } else if (isComplete == 1) {
            this.status = "Complete";
        } else {
            this.status = "Pending";
        }
        this.game_id = game_id;
    }
}

//returns the currnt state of the game given the user_id
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
//returns the result from the sql
var updateState = function(game_id, curr_state, callback) {
    var sql = "UPDATE games SET current_state = ? WHERE game_id = ?";
    db.query(sql, [curr_state, game_id], function(err, result) {
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
    var piece = data.color + "" + data.piece;
    var sql = "INSERT INTO game_moves (game_id, origin, dest, flags, piece, san, fen) VALUES (?,?,?,?,?,?,?)";
    db.query(sql, [data.game_id, data.from, data.to, data.flags, piece, data.san, data.fen], function(err, result) {
        if (err) {
            console.log("Cannot store message: " + err)
        } else {
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

//helps organize the data for the move information
//helps mainatin consitency between backend and front in the name of variables in a JSON.
var moveDataOrg = class {
    constructor(from, to, flags, piece, san) {
        this.color = piece.charAt(0);
        this.from = from;
        this.to = to;
        this.flags = flags;
        this.piece = piece.charAt(1);
        this.san = san;
    }
}

exports.getGameMoves = function(game_id, callback) {
    let moves = [];
    var sql = "SELECT * FROM game_moves WHERE game_id = ? ORDER BY move_time ASC";
    db.query(sql, [game_id], function(err, result) {
        if (err) {
            console.log("Cannot retrieve game moves: " + err);
            callback(err, null);
        } else {
            for (let i = 0; i < result.length; i++) {
                moves.push(new moveDataOrg(result[i].origin, result[i].dest, result[i].flags, result[i].piece, result[i].san));
            }
            callback(null, JSON.stringify(moves));
        }
    });
}

//returns the FEN string of a game given the game_id
//FEN strings help organizing the correct state of the board.
exports.getFEN = function(game_id, callback) {
    var sql = "SELECT fen FROM game_moves WHERE game_id = ? ORDER BY move_time DESC LIMIT 1";
    db.query(sql, [game_id], function(err, result) {
        console.log(result);
        if (isEmpty(result)) {
            callback(null, 'start');
        } else {
            callback(null, result[0].fen);
        }
    });
}

//returns the most recent move made in the game given the game_id, returns it as a JSON
exports.getGameLatestMove = function(game_id, callback) {
    let moves = [];
    var sql = "SELECT * FROM game_moves WHERE game_id = ? ORDER BY move_time DESC LIMIT 1";
    db.query(sql, [game_id], function(err, result) {
        if (err) {
            console.log("Cannot retrieve game moves: " + err);
            callback(err, null);
        } else {
            moves.push(new moveDataOrg(result[0].origin, result[0].dest, result[0].flags, result[0].piece, result[0].san));
            callback(null, JSON.stringify(moves));
        }
    });
}