const knex = require('../dbConfig.js').knex
const User = require('../ModelsDB/user.js')

userController = {
	findOrCreateUser : function(body){

		return knex.select('*').from('user').where('google_id', body.google_id)
			.then((profileCheck) => {
				console.log('in controller', profileCheck)
				if (profileCheck.length > 0) {
					knex('user').where('google_id', body.google_id).update({'accessToken': body.accessToken}).then(rows => {
						return knex.select('*').from('user').where('google_id', body.google_id)
							.then((profileCheck => {
								console.log('in profilecheck user ', profileCheck[0])
								return profileCheck[0]
							}))
					})
				} else {
						const newUser = new User({
						name: body.name,
						img: body.img,
						google_id: body.google_id,
						etag: body.etag,
						email: body.email,
						accessToken: body.accessToken,
						refreshToken: body.refreshToken
					})
					return newUser.save()
						.then(user => user.attributes)
				}
			})

	},
	getUser: async function(id) {
		console.log('getting user')
		let result =  await knex.select('*').from('user').where('id', id)
		console.log(result)
		return result[0]
	},
	getToken: function() {
		return knex.select('accessToken').from('user').where('id', id)
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
