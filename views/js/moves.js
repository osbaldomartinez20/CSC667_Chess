function moves(game_id) {
    var move;
    var request = new XMLHttpRequest();
    var params = 'game_id=' + game_id;
    request.open('GET', 'http://ec2-54-149-192-92.us-west-2.compute.amazonaws.com/gameMoves?' + params, false); // `false` makes the request synchronous
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            move = JSON.parse(request.responseText)
        }
    }
    request.send(null);
    if (!isEmpty(move)) {
        const moves = move.map((row) => {
            return { Color: row.color, From: row.from, To: row.to, Piece: row.piece }
        })
        var col = [];
        for (var i = 0; i < moves.length; i++) {
            for (var key in moves[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        var table = document.createElement("table");

        var tr = table.insertRow(-1);

        // this  creates dynamic headers from Json naming
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }


        for (var i = 0; i < moves.length; i++) {
            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = moves[i][col[j]];
            }
        }
        var divContainer = document.getElementById("move");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}