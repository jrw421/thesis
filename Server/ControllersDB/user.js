const knex = require('../dbConfig.js').knex
const User = require('../ModelsDB/user.js')

userController = {
	findOrCreateUser : function(body){

		return knex.select('*').from('user').where('google_id', body.google_id)
			.then((profileCheck) => {
				console.log('in controller', profileCheck)
				if (profileCheck.length > 0) {
					return profileCheck[0]
				} else {
						const newUser = new User({
						name: body.name,
						img: body.img,
						google_id: body.google_id,
						etag: body.etag,
						email: body.email,
						cookie: body.cookie
					})
					return newUser.save()
						.then(user => user.attributes)
				}
			})

	}, 
	getUser: async function(id) {
		let result =  await knex.select('*').from('user').where('id', id)
		return result[0]
	},
	findAll : function(){
    return knex.select('*').from('user')
	}, 
	deleteUser: function(id){
		return knex('user').where('id', id).del()
	}, 
	editField: function(id, field, newValue){
		return knex('user').where('id', id).update(field, newValue)
	}
}



module.exports = userController

