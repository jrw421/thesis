const knex = require('../dbConfig.js').knex
const Event = require('../ModelsDB/event.js')


eventController = {
	add : function(body){
		const newEvent = new Event({
			name: body.name,
			host_id: body.host,
  		description: body.description,
      date: body.date,
      location: body.location, 
      image: body.image
  	})
  	return newEvent.save()
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
	}
}

module.exports = eventController