function onlineP() {
    var jsonExamples = [{
        "Oponent": "joe"
    }, {
        "Oponent": "Jenna"
    }, {
        "Oponent": "Grave"
    }, {
        "Oponent": "Mary"
    }, {
        "Oponent": "Erick"
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
    var t = document.createElement("table");

    var tr = t.insertRow(-1);

    /*
      for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");
          //this will add the name on the left of the Json as table name 
          // th.innerHTML = col[i];
          //this creates a custom table name 
          th.innerHTML = "User Games"
          tr.appendChild(th);
      }*/


    for (var i = 0; i < jsonExamples.length; i++) {
        tr = t.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonExamples[i][col[j]];
        }
    }
    var oplayers = document.getElementById("p_online");
    oplayers.innerHTML = "";
    oplayers.appendChild(t);
    $("tr").click(function() {
        window.location = "index.html";
    });

}