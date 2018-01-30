const knex = require('../dbConfig.js').knex
const User = require('../ModelsDB/user.js')

userController = {
	addUser : function(body){
		const newUser = new User({
  		name: body.name,
      email: body.email,
      token: body.token,
  		member_status: body.status
  	})
  	return newUser.save()
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

