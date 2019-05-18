function user_Games(username) {
    var User_games;
    var request = new XMLHttpRequest();
    var params = 'username=' + username;
    request.open('GET', 'http://ec2-54-149-192-92.us-west-2.compute.amazonaws.com/userGames' + '?' + params, false); // `false` makes the request synchronous
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            User_games = JSON.parse(request.responseText)
        }
    }
    request.send(null);




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

    // this  creates dynamic headers from Json naming
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }


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
    $("tr").click(function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var rowtable = $(this).children('td').map(function() {
            return this.innerHTML;
        }).toArray();
        status = rowtable[1];
        game_id = rowtable[2];
        if (status == "Ongoing") {
            console.log("ongoing");
            window.location.href = 'p_game.html' + '#' + game_id;
        }
    });

}