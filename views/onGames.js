function onGames() {
    //get
    var OnGoing_games;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://ec2-54-149-192-92.us-west-2.compute.amazonaws.com/active', false);
    request.send(null);

    if (request.status === 200) {
        console.log(OnGoing_games = JSON.parse(request.responseText));
    }

    var col = [];
    for (var i = 0; i < OnGoing_games.length; i++) {
        for (var key in OnGoing_games[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    var tr = table.insertRow(-1);


    var th = document.createElement("th");
    th.innerHTML = "Player 1";
    tr.appendChild(th);
    var th = document.createElement("th");
    th.innerHTML = "Player 2";
    tr.appendChild(th);


    for (var i = 0; i < OnGoing_games.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = OnGoing_games[i][col[j]];
        }
    }
    var divContainer = document.getElementById("onG");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $("tr").click(function() {
        //  window.location = "index.html";
    });

}