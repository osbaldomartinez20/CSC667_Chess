const common = require('./gameBoardMethods');
const cap = require('../database/DatabaseMethods');

//gives the possible moves for a pawn. Moves one square towards the opponent, possibly two squares if pawn first move.
//complete
var possibleMovesPawn = function(pieceInfo, board) {
    var moves = [];
    var coordinate = pieceInfo.charAt(2) + pieceInfo.charAt(3);
    var arrC = common.calculatePiecePositionInArray(coordinate);
    if(pieceInfo.charAt(0) == 'W') {
        if(board[arrC[0] -1][arrC[1]-1].getPiece().charAt(0) == 'B') {
            moves.push(String.fromCharCode(coordinate.charCodeAt(0)-1) + String.fromCharCode(coordinate.charCodeAt(1)-1));
        }
        if(board[arrC[0]-1][arrC[1]+1].getPiece().charAt(0) == 'B') {
            moves.push(String.fromCharCode(coordinate.charCodeAt(0)-1) + String.fromCharCode(coordinate.charCodeAt(1)+1));
        }
        if(board[arrC[0]-1][arrC[1]].getPiece() != "") {
        return moves;
        }
    }
    if(pieceInfo.charAt(0) == 'B') {
        if(board[arrC[0]+1][arrC[1]-1].getPiece().charAt(0) == 'W') {
            moves.push(String.fromCharCode(coordinate.charCodeAt(0)+1) + String.fromCharCode(coordinate.charCodeAt(1)-1));
        }
        if(board[arrC[0]+1][arrC[1]+1].getPiece().charAt(0) == 'W') {
            moves.push(String.fromCharCode(coordinate.charCodeAt(0)+1) + String.fromCharCode(coordinate.charCodeAt(1)+1));
        }
        if(board[arrC[0]+1][arrC[1]].getPiece() != "") {
        return moves;
        }
    }
    if(pieceInfo.charAt(2) == 'G' && pieceInfo.charAt(0) == 'W' && board[arrC[0] - 2][arrC[1]].getPiece() == "") {
        moves.push(String.fromCharCode(pieceInfo.charCodeAt(2)-2) + pieceInfo.charAt(3));
    }
    if(pieceInfo.charAt(2) == 'B' && pieceInfo.charAt(0) == 'B' && board[arrC[0] + 2][arrC[1]].getPiece() == "") {
        moves.push(String.fromCharCode(pieceInfo.charCodeAt(2)+2) + pieceInfo.charAt(3));
    }
    if(pieceInfo.charAt(0) == 'W' && board[arrC[0] - 1][arrC[1]].getPiece() == "") {
        moves.push(String.fromCharCode(pieceInfo.charCodeAt(2)-1) + pieceInfo.charAt(3));
    }
    if(pieceInfo.charAt(0) == 'B'  && board[arrC[0] + 1][arrC[1]].getPiece() == "") {
        moves.push(String.fromCharCode(pieceInfo.charCodeAt(2)+1) + pieceInfo.charAt(3));
    }
    return moves;
}

//gives the possible moves for a rook. Moves in a straight line.
//complete
var possibleMovesRook = function(pieceInfo, board) {
    var moves = [];
    const coordinate = pieceInfo.charAt(2) + pieceInfo.charAt(3);
    var tempC = coordinate;
    const currentPos = common.calculatePiecePositionInArray(coordinate);
    var tempP = [currentPos[0], currentPos[1]];
    while(tempP[1] + 1 < 8  && board[tempP[0]][tempP[1]+1].getPiece() == "") {
        moves.push(tempC.charAt(0) + (tempP[1] + 2));
        tempP[1]++;
    }
    if(tempP[1] + 1 < 8 && board[tempP[0]][tempP[1]+1].getPiece().charAt(0) != pieceInfo.charAt(0)) {
        moves.push(tempC.charAt(0) + (tempP[1] + 2));
    }
    tempP = [currentPos[0], currentPos[1]];
    while(tempP[0] + 1 < 8 && board[tempP[0]+1][tempP[1]].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)+1) + (tempC.charAt(1)));
        tempP[0]++;
        tempC = String.fromCharCode(tempC.charCodeAt(0)+1) + tempC.charAt(1);
    }
    if(tempP[0] + 1 < 8 && board[tempP[0]+1][tempP[1]].getPiece().charAt(0) != pieceInfo.charAt(0)) {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)+1) + (tempC.charAt(1)));
    }
    tempP = [currentPos[0], currentPos[1]];
    tempC = coordinate;
    while(tempP[1] - 1 > -1 && board[tempP[0]][tempP[1]-1].getPiece() == "") {
        moves.push(tempC.charAt(0) + (tempP[1]));
        tempP[1]--;
    }
    if(tempP[1] - 1 > -1 && board[tempP[0]][tempP[1]-1].getPiece().charAt(0) != pieceInfo.charAt(0)) {
        moves.push(tempC.charAt(0) + (tempP[1]));
    }
    tempP = [currentPos[0], currentPos[1]];
    while(tempP[0] - 1 > -1 && board[tempP[0]-1][tempP[1]].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)-1) + (tempC.charAt(1)));
        tempP[0]--;
        tempC = String.fromCharCode(tempC.charCodeAt(0)-1) + tempC.charAt(1);
    }
    if(tempP[0] - 1 > -1 && board[tempP[0]-1][tempP[1]].getPiece().charAt(0) != pieceInfo.charAt(0)) {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)-1) + (tempC.charAt(1)));
    }
    return moves;
}

//gives the possible moves for a knight. Knight movement is L-shaped.
var possibleMovesKnight = function(pieceInfo, board) {
    var moves = [];
    const coordinate = pieceInfo.charAt(2) + pieceInfo.charAt(3);
    var tempC = coordinate;
    const currentPos = common.calculatePiecePositionInArray(coordinate);
    var tempP = [currentPos[0], currentPos[1]];
    if(tempP[0] + 2 < 8) {
        if(tempP[1] + 1 < 8 && board[tempP[0]+2][tempP[1]+1].getPiece() == "") {
            moves.push(String.fromCharCode(tempC.charCodeAt(0)+2) + String.fromCharCode(tempC.charCodeAt(1)+1));
        }
        if (tempP[1] - 1 > -1 && board[tempP[0]+2][tempP[1]-1].getPiece() == "") {
            moves.push(String.fromCharCode(tempC.charCodeAt(0)+2) + String.fromCharCode(tempC.charCodeAt(1)-1));
        } 
    }
    if(tempP[0] - 2 > -1) {
        if(tempP[1] + 1 < 8 && board[tempP[0]-2][tempP[1]+1].getPiece() == "") {
            moves.push(String.fromCharCode(tempC.charCodeAt(0)-2) + String.fromCharCode(tempC.charCodeAt(1)+1));
        }
        if (tempP[1] - 1 > -1 && board[tempP[0]-2][tempP[1]-1].getPiece() == "") {
            moves.push(String.fromCharCode(tempC.charCodeAt(0)-2) + String.fromCharCode(tempC.charCodeAt(1)-1));
        } 
    }
    if(tempP[1] + 2 < 8) {
        if(tempP[0] + 1 < 8 && board[tempP[0]+1][tempP[1]+2].getPiece() == "") {
            moves.push(String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)+2));
        }
        if (tempP[0] - 1 > -1 && board[tempP[0]-1][tempP[1]+2].getPiece() == "") {
            moves.push(String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)+2));
        } 
    }
    if(tempP[1] - 2 > -1) {
        if(tempP[0] + 1 < 8 && board[tempP[0]+1][tempP[1]-2].getPiece() == "") {
            moves.push(String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)-2));
        }
        if (tempP[0] - 1 > -1 && board[tempP[0]-1][tempP[1]-2].getPiece() == "") {
            moves.push(String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)-2));
        } 
    }
    return moves;
}

//gives the possible moves for a bishop. Bishop moves diagonally.
var possibleMovesBishop = function(pieceInfo, board) {
    var moves = [];
    const coordinate = pieceInfo.charAt(2) + pieceInfo.charAt(3);
    var tempC = coordinate;
    const currentPos = common.calculatePiecePositionInArray(coordinate);
    var tempP = [currentPos[0], currentPos[1]];
    while((tempP[0] + 1 < 8 && tempP[1] + 1 < 8) && board[tempP[0]+1][tempP[1]+1].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)+1));
        tempP =[tempP[0] + 1, tempP[1] + 1];
        tempC = String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)+1);
    }
    tempP = [currentPos[0], currentPos[1]];
    tempC = coordinate;
    while((tempP[0] + 1 < 8 && tempP[1] - 1 > -1) && board[tempP[0]+1][tempP[1]-1].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)-1));
        tempP =[tempP[0] + 1, tempP[1] - 1];
        tempC = String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)-1);
    }
    tempP = [currentPos[0], currentPos[1]];
    tempC = coordinate;
    while((tempP[0] - 1 > -1 && tempP[1] + 1 < 8) && board[tempP[0]-1][tempP[1]+1].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)+1));
        tempP =[tempP[0] - 1, tempP[1] + 1];
        tempC = String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)+1);
    }
    tempP = [currentPos[0], currentPos[1]];
    tempC = coordinate;
    while((tempP[0] - 1 > -1 && tempP[1] - 1 > -1) && board[tempP[0]-1][tempP[1]-1].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)-1));
        tempP =[tempP[0] - 1, tempP[1] - 1];
        tempC = String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)-1);
    }

    return moves;
}

//gives the possible moves for the queen. Queen moves the same as the rook plus the bishop.
var possibleMovesQueen = function(pieceInfo, board) {
    var moves = [];
    const coordinate = pieceInfo.charAt(2) + pieceInfo.charAt(3);
    var tempC = coordinate;
    const currentPos = common.calculatePiecePositionInArray(coordinate);
    var tempP = [currentPos[0], currentPos[1]];
    while((tempP[0] + 1 < 8 && tempP[1] + 1 < 8) && board[tempP[0]+1][tempP[1]+1].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)+1));
        tempP =[tempP[0] + 1, tempP[1] + 1];
        tempC = String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)+1);
    }
    tempP = [currentPos[0], currentPos[1]];
    tempC = coordinate;
    while((tempP[0] + 1 < 8 && tempP[1] - 1 > -1) && board[tempP[0]+1][tempP[1]-1].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)-1));
        tempP =[tempP[0] + 1, tempP[1] - 1];
        tempC = String.fromCharCode(tempC.charCodeAt(0)+1) + String.fromCharCode(tempC.charCodeAt(1)-1);
    }
    tempP = [currentPos[0], currentPos[1]];
    tempC = coordinate;
    while((tempP[0] - 1 > -1 && tempP[1] + 1 < 8) && board[tempP[0]-1][tempP[1]+1].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)+1));
        tempP =[tempP[0] - 1, tempP[1] + 1];
        tempC = String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)+1);
    }
    tempP = [currentPos[0], currentPos[1]];
    tempC = coordinate;
    while((tempP[0] - 1 > -1 && tempP[1] - 1 > -1) && board[tempP[0]-1][tempP[1]-1].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)-1));
        tempP =[tempP[0] - 1, tempP[1] - 1];
        tempC = String.fromCharCode(tempC.charCodeAt(0)-1) + String.fromCharCode(tempC.charCodeAt(1)-1);
    }
    tempP = [currentPos[0], currentPos[1]];
    tempC = coordinate;
    while(tempP[1] + 1 < 8  && board[tempP[0]][tempP[1]+1].getPiece() == "") {
        moves.push(tempC.charAt(0) + (tempP[1] + 2));
        tempP[1]++;
    }
    tempP = [currentPos[0], currentPos[1]];
    while(tempP[0] + 1 < 8 && board[tempP[0] + 1][tempP[1]].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)+1) + (tempC.charAt(1)));
        tempP[0]++;
        tempC = String.fromCharCode(tempC.charCodeAt(0)+1) + tempC.charAt(1);
    }
    tempP = [currentPos[0], currentPos[1]];
    tempC = coordinate;
    while(tempP[1] - 1 > -1 && board[tempP[0]][tempP[1] - 1].getPiece() == "") {
        moves.push(tempC.charAt(0) + (tempP[1]));
        tempP[1]--;
    }
    tempP = [currentPos[0], currentPos[1]];
    while(tempP[0] - 1 > -1 && board[tempP[0] - 1][tempP[1]].getPiece() == "") {
        moves.push(String.fromCharCode(tempC.charCodeAt(0)-1) + (tempC.charAt(1)));
        tempP[0]--;
        tempC = String.fromCharCode(tempC.charCodeAt(0)-1) + tempC.charAt(1);
    }

    return moves;
}

//gives the possible moves for the King. King can move one square in any direction.
var possibleMovesKing = function(pieceInfo, board) {
    var moves = [];
    const coordinate = pieceInfo.charAt(2) + pieceInfo.charAt(3);
    const currentPos = common.calculatePiecePositionInArray(coordinate);
    if(currentPos[0] + 1 < 8 && board[currentPos[0]+1][currentPos[1]].getPiece() == "") {
        moves.push(String.fromCharCode(coordinate.charCodeAt(0)+1) + (coordinate.charAt(1)));
    }
    if(currentPos[0] - 1 > -1 && board[currentPos[0]-1][currentPos[1]].getPiece() == "") {
        moves.push(String.fromCharCode(coordinate.charCodeAt(0)-1) + (coordinate.charAt(1)));
    }
    if(currentPos[1] + 1 < 8 && board[currentPos[0]+1][currentPos[1]].getPiece() == "") {
        moves.push(coordinate.charAt(0) + String.fromCharCode(coordinate.charCodeAt(1)+1));
    }
    if(currentPos[1] - 1 > -1 && board[currentPos[0]-1][currentPos[1]].getPiece() == "") {
        moves.push(coordinate.charAt(0) + String.fromCharCode(coordinate.charCodeAt(1)-1));
    }
    if(currentPos[0] + 1 < 8 && currentPos[1] + 1 < 8 && board[currentPos[0]+1][currentPos[1]+1].getPiece() == "") {
        moves.push(String.fromCharCode(coordinate.charCodeAt(0)+1) + String.fromCharCode(coordinate.charCodeAt(1)+1));
    }
    if(currentPos[0] - 1 > -1 && currentPos[1] + 1 < 8 && board[currentPos[0]-1][currentPos[1]+1].getPiece() == "") {
        moves.push(String.fromCharCode(coordinate.charCodeAt(0)-1) + String.fromCharCode(coordinate.charCodeAt(1)+1));
    }
    if(currentPos[0] + 1 < 8 && currentPos[1] - 1 > -1 && board[currentPos[0]+1][currentPos[1]-1].getPiece() == "") {
        moves.push(String.fromCharCode(coordinate.charCodeAt(0)+1) + String.fromCharCode(coordinate.charCodeAt(1)-1));
    }
    if(currentPos[0] - 1 > -1 && currentPos[1] - 1 > -1 && board[currentPos[0]-1][currentPos[1]-1].getPiece() == "") {
        moves.push(String.fromCharCode(coordinate.charCodeAt(0)-1) + String.fromCharCode(coordinate.charCodeAt(1)-1));
    }
    return moves;
}

var w = common.createBoard(8);
var x = common.assignCoordinates(w);
var fh = "BRD5";
var b = common.createBoard(8);
var cb = common.assignCoordinates(b);
var y = possibleMovesRook(fh, cb);
var cc = fh.charAt(2) + fh.charAt(3);
if(x[3][1].getPiece() == "") {
    var t = common.calculatePiecePositionInArray(cc);
}
var p = cb[0][0].getPiece();
console.log(t + " " + cc + " " + p + "\n" + y + " g");