const common = require('./gameBoardMethods');

//gives the possible moves for a pawn
var possibleMovesPawn = function(pieceInfo, board) {

}

var w = common.createBoard(8);
var x = common.assignCoordinates(w);
if(x[3][1].getPiece() == "") {
    var t = common.calculatePiecePositionInArray("A2");
}
console.log(t);