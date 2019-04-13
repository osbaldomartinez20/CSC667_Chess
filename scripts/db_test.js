const db = require('../auth/db_config.js')

if(db){

	console.log('Connection made')	
	console.log('Connected')
	queryString = "SELECT * FROM users"
	db.query(queryString, (err, results, fields) => {
		if (err) throw err
		
		console.log(results)
	})
}

db.end()
