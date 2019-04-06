//the K constant needed for the ELO calculation
var K = 24;

//the wining probality of player 2 winning
var winProbability = function(rank1, rank2) {
    return 1.0 * 1.0 / (1 + 1.0 *  Math.pow(10, 1.0 * (rank1 - rank2) / 400));
}

//calculates the ELO rating after each match
var EloRank = function(rank1, rank2, won) {
    //calculate probalitity of second player winning
    var player2 = winProbability(rank1, rank2);

    //calculate probalitity of first player winning
    var player1 = winProbability(rank2, rank1);

    //case where player 1 wins
    if (won == 1) {
        rank1 = rank1 + K * (1 - player1);
        rank2 = rank2 + K * (0 - player2);
    } 
    //case where player 2 wins
    else {
        rank1 = rank1 + K * (0 - player1);
        rank2 = rank2 + K * (1 - player2);
    }

    //instead of printing update values in the database
    console.log("Player 1:" + rank1);
    console.log("Player 2:" + rank2);
}
