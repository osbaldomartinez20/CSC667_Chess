function moves(moves) {
    if (jQuery.isEmptyObject(moves)) {
        console.log("first move")
    } else {
        var moving = { player: moves["color"], from: moves["from"], to: moves["to"], piece: moves["piece"] };
        var result = JSON.stringify(moving);
        var move = JSON.parse("[" + result + "]");
        console.log(move);
        var col = [];
        for (var i = 0; i < move.length; i++) {
            for (var key in move[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        console.log(col);
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        var tr = table.insertRow(-1);

        // this  creates dynamic headers from Json naming
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        /* var th = document.createElement("th");
         th.innerHTML = "White";
         tr.appendChild(th);
         var th = document.createElement("th");
         th.innerHTML = "Black";
         tr.appendChild(th);*/


        for (var i = 0; i < move.length; i++) {
            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = move[i][col[j]];
            }
        }
        var divContainer = document.getElementById("moves");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }
}