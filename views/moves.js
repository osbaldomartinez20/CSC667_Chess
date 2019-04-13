function moves() {
    var jsonExamples = [{
        "White": "e4",
        "Black": "e6"
    }, {
        "White": "Nb3",
        "Black": "Nc6"
    }, {
        "White": "Bb5",
        "Black": "Nf6"
    }, {
        "White": "Nc3",
        "Black": "Bc5"
    }, {
        "White": "0-0",
        "Black": "d5"
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


    var th = document.createElement("th");
    th.innerHTML = "White";
    tr.appendChild(th);
    var th = document.createElement("th");
    th.innerHTML = "Black";
    tr.appendChild(th);


    for (var i = 0; i < jsonExamples.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonExamples[i][col[j]];
        }
    }
    var divContainer = document.getElementById("moves");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $("tr").click(function() {
        window.location = "index.html";
    });

}