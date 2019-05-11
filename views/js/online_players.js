function onlineP(oPlayers) {
    var oPlayers
    var col = [];
    for (var i = 0; i < oPlayers.length; i++) {
        for (var key in oPlayers[i]) {
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


    for (var i = 0; i < oPlayers.length; i++) {
        tr = t.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = oPlayers[i][col[j]];
        }
    }
    var oplayers = document.getElementById("p_online");
    oplayers.innerHTML = "";
    oplayers.appendChild(tabCell);

}