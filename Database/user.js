//file used for methods that pertain to users
//can create and update users

var db = require('../auth/db_config.js');

//param id and email should be given from the information that google gives us.
exports.createUser = function(id, email) {

    var display_name = email.substring(0, email.indexOf('@'));
    var sql = "INSERT INTO users (user_id, email, display_name, wins, losses, elo) VALUES ('" + id + "','" + email + "', '" + display_name + "', 0, 0, 1200)";

    db.query(sql, function(err, result) {
        if (err) {
            console.log("failed to create user " + err);
            return false;
        } else {
            console.log("user created");
        }
    });
}

//this function changes the display_name of an user given the user_id
exports.updateDisplayName = function(user_id, newDisplayName) {
    var sql = "UPDATE users SET display_name = ? WHERE user_id = ?";
    db.query(sql, [newDisplayName, user_id], function(err, result) {
        if (err) {
            console.log("cannot update display_name: " + err);
            return false;
        } else {
            console.log(result.affectedRows + " record(s) updated");
        }
    });
}

//This function checks to see if an user with the given user_id exists.
//count is 0 if user does not exist, 1 otherwise.
exports.userExists = function(user_id) {
    var sql = "select count(*) from users where user_id = '" + user_id + "'"

    db.query(sql, function(err, result) {
        console.log("in the query function")
        if (err) {
            console.log("error looking up user:" + err)
            return false
        } else {
            console.log('Result: ' + result[0]['count(*)'])
            return result[0]['count(*)'];
        }
    })
}

//activates user session
exports.activateSession = function(id) {

    var sql = "INSERT INTO users (active_session) VALUES(1) WHERE user_id = id"

    db.query(sql, function(err, result) {
        if (err) {
            console.log(err)
            return 0;
        } else {
            console.log("user session is now activate")
            return 1;
        }
    });
}

//function that returns the display_name given the user_id
exports.getUserName = function(userid, callback) {
    console.log("user id: " + userid);
    var sql = "SELECT display_name FROM users WHERE user_id = ?";
    db.query(sql, [userid], function(err, result) {
        if (err) {
            console.log("Error retriving username: " + err);
            callback(err, null);
        } else {
            callback(null, result[0].display_name);
        }
    });
}

//helps getting the usernames of two players given their ids
exports.getTwoUserName = function(userid1, userid2, callback) {
    var sql = "SELECT display_name FROM users WHERE user_id = ? OR user_id = ?";
    db.query(sql, [userid1, userid2], function(err, result) {
        if (err) {
            console.log("Error retriving usernames: " + err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}


//function that returns the display_name given the user_id
exports.getUserId = function(username, callback) {
    var sql = "SELECT user_id FROM users WHERE display_name = ?";
    db.query(sql, [username], function(err, result) {
        if (err) {
            console.log("Error retriving userid: " + err);
            callback(err, null);
        } else {
            callback(null, result[0].user_id);
        }
    });
}