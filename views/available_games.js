function available_games() {
    var av_games;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://ec2-54-149-192-92.us-west-2.compute.amazonaws.com/pending', false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        console.log(av_games = JSON.parse(request.responseText));
    }


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

    console.log(jsonExamples);

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
        var game_id = cookie.get('game_id');
        var rowtable = $(this).children('td').map(function() {
            return this.innerHTML;
        }).toArray();
        user = rowtable[0];
        /* var xhr = new XMLHttpRequest();
         xhr.open('POST', 'http://localhost:3000/chat', false);
         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         xhr.send('game_id=' + user);*/

        console.log(user)
        cookie.set('game_id', user);
        window.location = "http://54.149.192.92/p_game.html";
    });

}