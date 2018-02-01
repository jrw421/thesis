const crypto = require('crypto')
const knex = require('../dbConfig.js').knex

const generateID = function(){
	let id = crypto.randomBytes(20).toString('hex')
	knex.select('*').from('user').where('id', id).then((data) => {
		if(data.length){
			generateID()
		} else {
			return id
		}
	})	
}
