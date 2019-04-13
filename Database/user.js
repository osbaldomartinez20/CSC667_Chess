//file used for methods that pertain to users
//can create and update users

var db = require('../auth/db_config.js')

//param id and email should be given from the information that google gives us.
exports.createUser = function (id, email) {

    var display_name = email.substring(0, email.indexOf('@'));
    var sql = "INSERT INTO users (user_id, email, display_name, wins, losses, elo) VALUES ('" + id + "','" + email + "', '" + display_name + "', 0, 0, 1200)";

    db.query(sql, function (err, result) {
        if(err) {
            console.log("failed to create user " + err);
            return;
        } else {
            console.log("user created");
        }
    });
}

exports.updateDisplayName = function(email, newDisplayName) {
    var sql = "UPDATE users SET display_name = '" + newDisplayName + "' WHERE email = '" + email + "'";
    db.query(sql, function(err, result) {
        if (err) {
            console.log("cannot update display_name: " + err);
            return false;
        } else {
            console.log(result.affectedRows + " record(s) updated");
        }
    });
}
