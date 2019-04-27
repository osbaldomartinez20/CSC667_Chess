function onGames() {

     //get
     var id_token = googleUser.getAuthResponse().id_token;
     console.log("ID Token: " + id_token);
     var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://ec2-54-149-192-92.us-west-2.compute.amazonaws.com/active');
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.onload = function() {
         setID(xhr.responseText)
         console.log('Signed in as: ' + xhr.responseText);
         window.location.href = "lobby.html";
     };
    var jsonExamples = [{
        "Player 1": "Bob",
        "Player 2": "Mark"
    }, {
        "Player 1": "Jenna",
        "Player 2": "Bob"
    }, {
        "Player 1": "Grave",
        "Player 2": "John"
    }, {
        "Player 1": "Mary",
        "Player 2": "Jake"
    }, {
        "Player 1": "Erick",
        "Player 2": "Patricia"
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
    th.innerHTML = "Player 1";
    tr.appendChild(th);
    var th = document.createElement("th");
    th.innerHTML = "Player 2";
    tr.appendChild(th);


    for (var i = 0; i < jsonExamples.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonExamples[i][col[j]];
        }
    }
    var divContainer = document.getElementById("onG");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $("tr").click(function() {
        window.location = "index.html";
    });

}