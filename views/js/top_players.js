function topPlayers() {
    //get
    var top_Players;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://ec2-54-149-192-92.us-west-2.compute.amazonaws.com/top', false);
    request.onload = function() {
        if (request.status == 200) {
            top_Players = JSON.parse(request.responseText)
        }
    }
    request.send(null);

    var col = [];
    for (var i = 0; i < top_Players.length; i++) {
        for (var key in top_Players[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    var tr = table.insertRow(-1);


    var th = document.createElement("th");
    th.innerHTML = "Player";
    tr.appendChild(th);
    var th = document.createElement("th");
    th.innerHTML = "ELO";
    tr.appendChild(th);


    for (var i = 0; i < top_Players.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = top_Players[i][col[j]];
        }
    }
    var divContainer = document.getElementById("topP");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $("tr").click(function() {
        //  window.location = "index.html";
    });

}