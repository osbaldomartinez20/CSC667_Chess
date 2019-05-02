function user_Games() {
    var User_games;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://ec2-54-149-192-92.us-west-2.compute.amazonaws.com/pending', false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        console.log(User_games = JSON.parse(request.responseText));
    }


    var col = [];
    for (var i = 0; i < User_games.length; i++) {
        for (var key in User_games[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    var tr = table.insertRow(-1);


    var th = document.createElement("th");
    th.innerHTML = "Game";
    tr.appendChild(th);
    var th = document.createElement("th");
    th.innerHTML = "Status";
    tr.appendChild(th);


    for (var i = 0; i < User_games.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = User_games[i][col[j]];
        }
    }
    var divContainer = document.getElementById("userGames");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $("tr").click(function() {
        // window.location = "index.html";
    });

}