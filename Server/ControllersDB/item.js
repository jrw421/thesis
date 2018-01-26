const knex = require('../dbConfig.js').knex
const Item = require('../ModelsDB/item.js')

itemController = {
	add : (body, cb) =>{
		const newItem = new Item({
  		name: body.name,
      user_id: body.user,
      event_id: body.event
  	})
  	newItem.save()
  	.then(item => {
  		cb(true, item);
  	})
  	.catch(err => {
  		cb(false, err)
  	})
	}, 
	getItem: (id, cb) => {
		knex.select('*').from('item')
		.where('id', id)
		.then(item=> {
			cb(item);
		})
	},
	findAll : (cb) =>{
		knex.select('*').from('item')
    .then((result) => {
      cb(result);
  	})
	}
}

module.exports = itemController