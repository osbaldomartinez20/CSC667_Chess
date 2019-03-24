const common = require('./gameBoardMethods');

//gives the possible moves for a pawn
var possibleMovesPawn = function(pieceInfo, board) {
    var moves = [];
    var coordinate = pieceInfo.charAt(2) + pieceInfo.charAt(3);
    var arrC = common.calculatePiecePositionInArray(coordinate);
    if( pieceInfo.charAt(0) == 'W' && board[arrC[0] - 1][arrC[1]].getPiece() != "") {
        return moves;
    }
    if(pieceInfo.charAt(0) == 'B' && board[arrC[0] + 1][arrC[1]].getPiece() != "") {
        return moves;
    }
    if(pieceInfo.charAt(2) == 'G' && pieceInfo.charAt(0) == 'W' && board[arrC[0] - 2][arrC[1]].getPiece() == "") {
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

//gives the possible moves for a rook
var possibleMovesRook = function(pieceInfo, board) {
    var coordinate = pieceInfo.charAt(2) + pieceInfo.charAt(3);
    var currentPos = common.calculatePiecePositionInArray(coordinate);
    while(board[currentPos[0]][currentPos[1]+1].getPiece()) {
        
    }
}

var w = common.createBoard(8);
var x = common.assignCoordinates(w);
var fh = "WPG7";
var b = common.createBoard(8);
var cb = common.assignCoordinates(b);
var y = possibleMovesPawn(fh, cb);
var cc = fh.charAt(2) + fh.charAt(3);
if(x[3][1].getPiece() == "") {
    var t = common.calculatePiecePositionInArray("A2");
}
console.log(t + " " + cc + "\n" + y + " g");