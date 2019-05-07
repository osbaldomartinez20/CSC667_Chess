function available_games() {
    var av_games;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/pending', false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        console.log(av_games = JSON.parse(request.responseText));
    }

    var col = [];
    for (var i = 0; i < av_games.length; i++) {
        for (var key in av_games[i]) {
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
    /*   var th = document.createElement("th");
       th.innerHTML = "Player"
       tr.appendChild(th);

       var th = document.createElement("th");
       th.innerHTML = "Level"
       tr.appendChild(th);*/


    for (var i = 0; i < av_games.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = av_games[i][col[j]];
        }
    }
    var aGames = document.getElementById("available_games");
    aGames.innerHTML = "";
    aGames.appendChild(table);
    $("tr").click(function() {
        var rowtable = $(this).children('td').map(function() {
            return this.innerHTML;
        }).toArray();
        game_id = rowtable[0];
        user = rowtable[1];
        const user_id = cookie.get('user');
        if (user != user_id) {
            var xhr = new XMLHttpRequest();
            xhr.open('PUT', 'http://localhost:3000/join', false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send('game_id=' + game_id + '&' + 'user_id=' + user_id);
            console.log('Signed in as: ' + xhr.responseText);
            console.log("user_id" + user)
            cookie.set('game_id', game_id);
            window.location = "p_game.html";
        } else if (user == user_id) {
            // alert("you need to wait for an opponent");
        }
        console.log("user_id" + user)
        cookie.set('game_id', game_id);
        window.location = "p_game.html";
    });

}