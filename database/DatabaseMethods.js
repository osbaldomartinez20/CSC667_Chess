//DATABASE METHODS


//user table methods

//this methods receives the user's email, which is stored and is also used to make the display name
function newUser(mail) {
    //make the username everything before the @ in the mail
    var userName = "";
    var i = 0;
    while (mail.charAt(i) != '@') {
        userName += mail.charAt(i);
        i++;
    }
    //store the email and the usename into the database

}

//this function will store the captured game pieces in database
exports.capturePiece = function(gamePiece) {

}
