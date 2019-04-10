//the K constant needed for the ELO calculation
var K = 24;

//database
var db = require('../config/db.config');


//the wining probality of player 2 winning
var winProbability = function(rank1, rank2) {
    return 1.0 * 1.0 / (1 + 1.0 *  Math.pow(10, 1.0 * (rank1 - rank2) / 400));
}

//calculates the ELO rating after each match
//The parameters are the display names of the users
var EloRank = function(user1, user2, won) {

    var rank1 = 0;
    var rank2 = 0;
    db.query("SELECT elo FROM users WHERE display_name = '" + user1 + "'", function(err, result) {
        if(err) {
            console.log("cannot retrieve ELO: " + err);
            return false;
        } else {
            rank1 = JSON.parse(JSON.stringify(result))[0].elo;
            db.query("SELECT elo FROM users WHERE display_name = '" + user2 + "'", function(err, result) {
                if(err) {
                    console.log("cannot retrieve ELO: " + err);
                    return false;
                } else {
                    rank2 = JSON.parse(JSON.stringify(result))[0].elo;

                    //calculate probalitity of second player winning
                    var player2 = winProbability(rank1, rank2);

                    //calculate probalitity of first player winning
                     var player1 = winProbability(rank2, rank1);

                    //case where player 1 wins
                    if (won == 1) {
                        rank1 = rank1 + K * (1 - player1);
                        rank2 = rank2 + K * (0 - player2);
                        db.query("SELECT wins FROM users WHERE display_name = '" + user1 + "'", function(err, result) {
                            if(err) {
                                console.log("cannot retrieve wins: " + err);
                                return false;
                            } else {
                                var win1 = JSON.parse(JSON.stringify(result))[0].wins + 1;
                                db.query("UPDATE users SET wins = " + win1 + " WHERE display_name = '" + user1 + "'", function(err, result) {
                                    if (err) {
                                        console.log("cannot update wins: " + err);
                                        return false;
                                    } else {
                                        console.log(result.affectedRows + " record(s) updated");
                                    }
                                });
                            }
                        });
                        db.query("SELECT losses FROM users WHERE display_name = '" + user2 + "'", function(err, result) {
                            if(err) {
                                console.log("cannot retrieve losses: " + err);
                                return false;
                            } else {
                                var losses1 = JSON.parse(JSON.stringify(result))[0].losses + 1;
                                db.query("UPDATE users SET losses = " + losses1 + " WHERE display_name = '" + user2 + "'", function(err, result) {
                                    if (err) {
                                        console.log("cannot update losses: " + err);
                                        return false;
                                    } else {
                                        console.log(result.affectedRows + " record(s) updated");
                                    }
                                });
                            }
                        });
                    } 
                         //case where player 2 wins
                    else {
                        rank1 = rank1 + K * (0 - player1);
                        rank2 = rank2 + K * (1 - player2);
                        db.query("SELECT wins FROM users WHERE display_name = '" + user2 + "'", function(err, result) {
                            if(err) {
                                console.log("cannot retrieve wins: " + err);
                                return false;
                            } else {
                                var win2 = JSON.parse(JSON.stringify(result))[0].wins + 1;
                                db.query("UPDATE users SET wins = " + win2 + " WHERE display_name = '" + user2 + "'", function(err, result) {
                                    if (err) {
                                        console.log("cannot update wins: " + err);
                                        return false;
                                    } else {
                                        console.log(result.affectedRows + " record(s) updated");
                                    }
                                });
                            }
                        });
                        db.query("SELECT losses FROM users WHERE display_name = '" + user1 + "'", function(err, result) {
                            if(err) {
                                console.log("cannot retrieve losses: " + err);
                                return false;
                            } else {
                                var losses2 = JSON.parse(JSON.stringify(result))[0].losses + 1;
                                db.query("UPDATE users SET losses = " + losses2 + " WHERE display_name = '" + user1 + "'", function(err, result) {
                                    if (err) {
                                        console.log("cannot update losses: " + err);
                                        return false;
                                    } else {
                                        console.log(result.affectedRows + " record(s) updated");
                                    }
                                });
                            }
                        });
                    }

                    //updates the ELO values of the players in the database
                    var r1 = "UPDATE users SET elo = " + rank1 + " WHERE display_name = '" + user1 + "'";
                    var r2 = "UPDATE users SET elo = " + rank2 + " WHERE display_name = '" + user2 + "'";

                    db.query(r1, function(err, result) {
                        if (err) {
                            console.log("cannot update ELO: " + err);
                            return false;
                        } else {
                            console.log(result.affectedRows + " record(s) updated");
                        }
                    });
                    db.query(r2, function(err, result) {
                        if (err) {
                            console.log("cannot update ELO: " + err);
                            return false;
                        } else {
                            console.log(result.affectedRows + " record(s) updated");
                        }
                    });
                    console.log("Player 1:" + rank1);
                    console.log("Player 2:" + rank2);
                }
            });
        }
    });

}

EloRank("osbaldoiniguez", "ozo", 1);