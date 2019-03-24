var common = require('./boardTileMethods');

//creates an x by x board
exports.createBoard = function(x) {

    var board = new Array(x);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(x);
    }

    return board;

}

//this function initializes the game pieces into their starting positions

///*//assigns chess cordinates to a board
exports.assignCoordinates = function(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if(i == 0) {
                if(j == 0 || j == 7) {
                    board[i][j] = new common.boardTile("A" + (j+1), "Rook");
                }
                if(j == 1 || j == 6) {
                    board[i][j] = new common.boardTile("A" + (j+1), "Knight");
                }
                if (j == 2 || j == 5) {
                    board[i][j] = new common.boardTile("A" + (j+1), "Bishop");
                }
                if (j == 3) {
                    board[i][j] = new common.boardTile("A" + (j+1), "King");
                }
                if (j == 4) {
                    board[i][j] = new common.boardTile("A" + (j+1), "Queen");
                }
            }
            if(i == 1) {
                board[i][j] = new common.boardTile("B" + (j+1), "Pawn");
            }
            if(i == 2) {
                board[i][j] = new common.boardTile("C" + (j+1), "");
            }
            if(i == 3) {
                board[i][j] = new common.boardTile("D" + (j+1), "");
            }
            if(i == 4) {
                board[i][j] = new common.boardTile("E" + (j+1),"");
            }
            if(i ==5) {
                board[i][j] = new common.boardTile("F" + (j+1), "");
            }
            if(i == 6) {
                board[i][j] = new common.boardTile("G" + (j+1), "Pawn");
            }
            if(i == 7) {
                if(j == 0 || j == 7) {
                    board[i][j] = new common.boardTile("H" + (j+1), "Rook");
                }
                if(j == 1 || j == 6) {
                    board[i][j] = new common.boardTile("H" + (j+1), "Knight");
                }
                if (j == 2 || j == 5) {
                    board[i][j] = new common.boardTile("H" + (j+1), "Bishop");
                }
                if (j == 3) {
                    board[i][j] = new common.boardTile("H" + (j+1), "King");
                }
                if (j == 4) {
                    board[i][j] = new common.boardTile("H" + (j+1), "Queen");
                }
            }
            
        }
    }

    return board;

}

exports.calculatePiecePositionInArray = function(coordinate) {
    let temp = [];
    switch(coordinate.charAt(0)) {
        case 'A':
            coordinate = coordinate.replace('A', '0');
            break;
        case 'B':
            coordinate = coordinate.replace('B', '1');
            break;
        case 'C':
            coordinate = coordinate.replace('C', '2');
            break;
        case 'D':
            coordinate = coordinate.replace('D', '3');
            break;
        case 'E':
            coordinate = coordinate.replace('E', '4');
            break;
        case 'F':
            coordinate = coordinate.replace('F', '5');
            break;
        case 'G':
            coordinate = coordinate.replace('G', '6');
            break;
        case 'H':
            coordinate = coordinate.replace('H', '7');
            break;
    }
    temp.push(parseInt(coordinate.charAt(0)));
    temp.push(parseInt(coordinate.charAt(1)));
    return temp; 
}

exports.updateBoard = function(gamePieceInfo, newCordinate) {

}
//*/
/*
var b = createBoard(8);
var xv = assignCoordinates(b);
var pi = new common.gamePiece("Pawn", "B1");
console.log(JSON.stringify(pi));
pi.move();

console.log(JSON.stringify(pi));

console.log(xv);
//*/