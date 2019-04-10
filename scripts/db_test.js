const db = require('../models/db_config.js')

if(db)
{
	console.log('Connection made!')
}
if(!db)
{
	console.log('No connection made')
}
