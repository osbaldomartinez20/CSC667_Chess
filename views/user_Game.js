function user_game() {
     //get
     var id_token = googleUser.getAuthResponse().id_token;
     console.log("ID Token: " + id_token);
     var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://ec2-54-149-192-92.us-west-2.compute.amazonaws.com/pending');
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.onload = function() {
         setID(xhr.responseText)
         console.log('Signed in as: ' + xhr.responseText);
         window.location.href = "lobby.html";
     };
    var jsonExamples = [{
        "Oponent": "Bob",
        "status": "Going"
    }, {
        "Oponent": "Jenna",
        "status": "Going"
    }, {
        "Oponent": "Grave",
        "status": "Going"
    }, {
        "Oponent": "Mary",
        "status": "Going"
    }, {
        "Oponent": "Erick",
        "status": "Finished"
    }, {
        "Oponent": "Erick",
        "status": "Finished"
    }, {
        "Oponent": "Erick",
        "status": "Finished"
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
    th.innerHTML = "Game";
    tr.appendChild(th);
    var th = document.createElement("th");
    th.innerHTML = "Status";
    tr.appendChild(th);


    for (var i = 0; i < jsonExamples.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonExamples[i][col[j]];
        }
    }
    var divContainer = document.getElementById("userGames");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $("tr").click(function() {
        window.location = "index.html";
    });

}