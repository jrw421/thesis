const knex = require('../dbConfig.js').knex
const Item = require('../ModelsDB/item.js')

itemController = {
	add : function(body){
		const newItem = new Item({
  		name: body.name,
      user_id: body.user,
      event_id: body.event
  	})
  	return newItem.save()
	}, 
	getItem: function(id) {
		return knex.select('*').from('item').where('id', id)
	},
	getItemsByUserId: function(user_id) {
		return knex.select('*').from('item').where('user_id', user_id)
	}, 
	getItemsByEventId: function(event_id) {
		return knex.select('*').from('item').where('event_id', event_id)
	}, 
	findAll : function(){
		return knex.select('*').from('item')
	}, 
	deleteItem: function(id){
		return knex('item').where('id', id).del()
	}, 
	updateField: function(id, field, newValue){
		return knex('item').where('id', id).update(field, newValue)
	}
}

module.exports = itemController