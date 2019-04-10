//file used for methods that pertain to users
//can create and update users

var db = require('../config/db.config');


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