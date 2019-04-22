//file used for methods that pertain to users
//can create and update users

var db = require('../auth/db_config.js')

//param id and email should be given from the information that google gives us.
exports.createUser = function (id, email) {

    var display_name = email.substring(0, email.indexOf('@'));
    var sql = "INSERT INTO users (user_id, email, display_name, wins, losses, elo) VALUES ('" + id + "','" + email + "', '" + display_name + "', 0, 0, 1200)";

    db.query(sql, function (err, result) {
        if (err) {
            console.log("failed to create user " + err);
            return false;
        } else {
            console.log("user created");
        }
    });
}

exports.updateDisplayName = function (user_id, newDisplayName) {
    var sql = "UPDATE users SET display_name = '" + newDisplayName + "' WHERE user_id = '" + user_id + "'";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("cannot update display_name: " + err);
            return false;
        } else {
            console.log(result.affectedRows + " record(s) updated");
        }
    });
}

exports.userExists = function (user_id) {
    var sql = "select count(*) from users where user_id = '" + user_id + "'"

    db.query(sql, function (err, result) {
        console.log("in the query function")
        if (err) {
            console.log("error looking up user:" + err)
            return false
        }
        else {
            console.log('Result: ' + result[0]['count(*)'])
            return result[0]['count(*)'];
        }
    })
}

exports.activateSession = function (id) {

    var sql = "INSERT INTO users (active_session) VALUES(1) WHERE user_id = id"

    db.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return 0;
        }
        else {
            console.log("user session is now activate")
            return 1;
        }
    })
}