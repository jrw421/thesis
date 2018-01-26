const knex = require('../dbConfig.js').knex
const User = require('../ModelsDB/user.js')

userController = {
	add : (body, cb) =>{
		const newUser = new User({
  		name: body.name,
      email: body.email,
      token: body.token
  		member_status: body.status
  	})
  	newUser.save()
  	.then(user => {
  		cb(true, user);
  	})
  	.catch(err => {
  		cb(false, err)
  	})
	}, 
	getUser: (id, cb) => {
		knex.select('*').from('user')
		.where('id', id)
		.then(user=> {
			cb(user);
		})
	},
	findAll : (cb) =>{
    knex.select('*').from('user')
    .then((result) => {
      cb(result);
  	})
	}
}

module.exports = userController

