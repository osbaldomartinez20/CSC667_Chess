    exports.boardTile = class {
        constructor(coordinate, piece) {
            this.coordinate = coordinate;
            this.piece = piece;
        }

        getPiece() {
            return this.piece;
        }
    }

    function gamePiece(role, coordinate) {

        this.role = role;
        this.coordinate = coordinate;

        this.move = function() {
            if (this.role == "Pawn") {
                this.coordinate = String.fromCharCode(this.coordinate.charCodeAt(0) + 1) + this.coordinate.charAt(1);
            }
        };
    
        this.capture = function() {
    
        };
    }


