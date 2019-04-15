const db = require('../auth/db_config.js')

if(db){

	console.log('Connection made')	
	console.log('Connected')
	queryString = "SELECT count(*) FROM users"
	db.query(queryString, (err, results, fields) => {
		if (err) throw err
		else{
		    console.log(results[0]['count(*)'])
		}
	})
}
db.end()
