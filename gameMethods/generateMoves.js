const common = require('./gameBoardMethods');

//gives the possible moves for a pawn
var possibleMovesPawn = function(pieceInfo, board) {
    var moves = [];
    var coordinate = pieceInfo.charAt(2) + pieceInfo.charAt(3);
    var arrC = common.calculatePiecePositionInArray(coordinate);
    if(board[arrC[0] + 1][arrC[1]].getPiece() == "") {
        return moves;
    }
    if(pieceInfo.charAt(2) == 'G' && pieceInfo.charAt(0) == 'W') {
        moves.push(String.fromCharCode(pieceInfo.charCodeAt(2)-2) + pieceInfo.charAt(3));
    }
    if(pieceInfo.charAt(2) == 'B' && pieceInfo.charAt(0) == 'B') {
        moves.push(String.fromCharCode(pieceInfo.charCodeAt(2)+2) + pieceInfo.charAt(3));
    }
    if(pieceInfo.charAt(0) == 'W') {
        moves.push(String.fromCharCode(pieceInfo.charCodeAt(2)-1) + pieceInfo.charAt(3));
    }
    if(pieceInfo.charAt(0) == 'B') {
        moves.push(String.fromCharCode(pieceInfo.charCodeAt(2)+1) + pieceInfo.charAt(3));
    }
    return moves;
}

var w = common.createBoard(8);
var x = common.assignCoordinates(w);
var fh = "BPB7";
var b = common.createBoard(8);
var cb = common.assignCoordinates(b);
var y = possibleMovesPawn(fh, cb);
var cc = fh.charAt(2) + fh.charAt(3);
if(x[3][1].getPiece() == "") {
    var t = common.calculatePiecePositionInArray("A2");
}
console.log(t + " " + cc + "\n" + y + " g");