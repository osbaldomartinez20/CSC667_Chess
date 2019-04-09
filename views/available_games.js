function available_games() {
    var jsonExamples = [{
        "Oponent": "Anton",
        "Level": "Begginer"

    }, {
        "Oponent": "Jenna",
        "Level": "Intermediate"
    }, {
        "Oponent": "Grave",
        "Level": "Intermediate"
    }, {
        "Oponent": "Mary",
        "Level": "Begginer"
    }, {
        "Oponent": "Erick",
        "Level": "Advanced"
    }]

    var col = [];
    for (var i = 0; i < jsonExamples.length; i++) {
        for (var key in jsonExamples[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    var tr = table.insertRow(-1);

    /**
     * this  creates dynamic headers from Json naming
     * for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
             th.innerHTML = col[i];
             tr.appendChild(th);
        }
     */
    var th = document.createElement("th");
    th.innerHTML = "Player"
    tr.appendChild(th);

    var th = document.createElement("th");
    th.innerHTML = "Level"
    tr.appendChild(th);


    for (var i = 0; i < jsonExamples.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonExamples[i][col[j]];
        }
    }
    var aGames = document.getElementById("available_games");
    aGames.innerHTML = "";
    aGames.appendChild(table);
    $("tr").click(function() {
        window.location = "index.html";
    });

}