var db = require('../auth/db_config.js')

//param id and email should be given from the information that google gives us.
exports.getGameID = function() {

    result = Math.floor((Math.random() * 100) + 1);
    return result;

}