//the K constant needed for the ELO calculation
var K = 24;

//variable for the number of top players to display
var top = 20;

//database
var db = require('../auth/db_config.js');


//the wining probality of player 2 winning
var winProbability = function(rank1, rank2) {
    return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (rank1 - rank2) / 400));
}

//calculates the ELO rating after each match
//The parameters are the display names of the users
//and the won parameter is a 1 if user1 won and a 0 if user2 won
exports.updateEloRank = function(user1, user2, won) {

    var rank1 = 0;
    var rank2 = 0;
    db.query("SELECT * FROM users WHERE display_name =  ? OR display_name = ? ", [user1, user2], function(err, result) {
        if (err) {
            console.log("cannot retrieve ELO: " + err);
            return false;
        } else {
            //get the rankings for both players
            rank1 = result[1].elo;
            rank2 = result[0].elo;

            //calculate probalitity of second player winning
            var player2 = winProbability(rank1, rank2);

            //calculate probalitity of first player winning
            var player1 = winProbability(rank2, rank1);

            //case where player 1 wins
            if (won == 1) {
                var new1 = K * (1 - player1);
                var new2 = K * (0 - player2);
                rank1 += new1;
                rank2 += new2;
                var win1 = result[1].wins;
                win1++;
                //update player 1 in database
                db.query("UPDATE users SET elo = " + rank1 + ", wins = " + win1 + " WHERE display_name = '" + user1 + "'", function(err, result) {
                    if (err) {
                        console.log("cannot update ELO or wins: " + err);
                        return false;
                    } else {
                        console.log(result.affectedRows + " record(s) updated");
                    }
                });
                var losses2 = result[0].losses;
                losses2++;
                //update player 2 in database
                db.query("UPDATE users SET elo = " + rank2 + ", losses = " + losses2 + " WHERE display_name = '" + user2 + "'", function(err, result) {
                    if (err) {
                        console.log("cannot update losses: " + err);
                        return false;
                    } else {
                        console.log(result.affectedRows + " record(s) updated");
                    }
                });
            }
            //case where player 2 wins
            else {
                rank1 = rank1 + K * (0 - player1);
                rank2 = rank2 + K * (1 - player2);
                var win2 = result[0].wins;
                win2++;
                //update player 2 in database
                db.query("UPDATE users SET elo = " + rank2 + ", wins = " + win2 + " WHERE display_name = '" + user2 + "'", function(err, result) {
                    if (err) {
                        console.log("cannot update ELO or wins: " + err);
                        return false;
                    } else {
                        console.log(result.affectedRows + " record(s) updated");
                    }
                });
                var losses1 = result[1].losses;
                losses1++;
                //update player 1 in database
                db.query("UPDATE users SET elo = " + rank1 + ", losses = " + losses1 + " WHERE display_name = '" + user1 + "'", function(err, result) {
                    if (err) {
                        console.log("cannot update ELO or losses: " + err);
                        return false;
                    } else {
                        console.log(result.affectedRows + " record(s) updated");
                    }
                });
            }
        }
    });

}

//function that takes user_id as parameter and return ELO ranking
exports.getElo = function(userid, callback) {
    db.query("SELECT elo FROM users WHERE user_id = '" + userid + "'", function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            console.log(result);
            callback(null, result[0].elo);
        }
    });
}

//returns the probability of an user given 
//@param 1 user_id
//@param 2 user_id of opponent
exports.getUserWinningProbability = function(u_id, o_id, callback) {
    db.query("SELECT elo FROM users WHERE user_id = '" + o_id + "' OR user_id = '" + u_id + "'", function(err, result) {
        if (err) {
            console.log("Cannot get elo: " + err);
            callback(err, null);
        } else {
            var p_win = winProbability(result[1].elo, result[0].elo);
            callback(null, p_win);
        }
    });
}

//class to hold the display_name and elo ranking of a player
var playerRankInfo = class {
    constructor(display_name, elo, wins, losses) {
        this.display_name = display_name;
        this.elo = elo;
        this.wins = wins;
        this.losses = losses;
    }
}

//returns a JSON with the top players and their ELO score
exports.getTopPlayers = function(callback) {
    var p_top = [];
    var sql = "SELECT * FROM users ORDER BY elo DESC LIMIT " + top + "";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("Cannot retrieve data: " + err);
            callback(err, null)
        } else {
            for (var i = 0; i < result.length; i++) {
                p_top.push(new playerRankInfo(result[i].display_name, result[i].elo, result[i].wins, result[i].losses));
            }
            callback(null, JSON.stringify(p_top));
        }
    });
}