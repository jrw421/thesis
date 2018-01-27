const knex = require('../dbConfig.js').knex
const User = require('../ModelsDB/user.js')

userController = {
	add : function(body){
		const newUser = new User({
  		name: body.name,
      email: body.email,
      token: body.token,
  		member_status: body.status
  	})
  	return newUser.save()
	}, 
	getUser: function(id) {
		return knex.select('*').from('user').where('id', id)
	},
	findAll : function(){
    return knex.select('*').from('user')
	}
}

module.exports = userController

