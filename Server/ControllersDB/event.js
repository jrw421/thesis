const knex = require('../dbConfig.js').knex
const Event = require('../ModelsDB/event.js')


eventController = {
	addEvent : async (body) => {
		const newEvent = new Event({
			name: body.name,
			host_id: body.host,
  		description: body.description,
      date: body.date,
      location: body.location, 
      image: body.image
  	})
		 var result = await newEvent.save()
		 return result.attributes
	},

	getHostedEvents : function(host_id){
		return knex.select('*').from('event').where('host_id', host_id)
	},
	// bydate: function(date, user_id){
	// 	var newDate = new Date()
	// 	knex.select('*').from('event_attendee').where('user_id', user_id).orderBy('date', 'ASC')
	// },
	getEvent: function(id){
		return knex.select('*').from('event').where('id', id)
	},
	findAll : function(){
		return knex.select('*').from('event')
	}, 
	deleteEvent : function(id){
		return knex('event').where('id', id).del()
	}, 
	editField : function(id, field, newValue){
		return knex('event').where('id', id).update(field, newValue)
	}
}

module.exports = eventController