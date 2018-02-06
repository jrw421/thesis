const knex = require('../dbConfig.js').knex
const Event_Attendee = require('../ModelsDB/event_attendee.js')

eventAttendeeController = {
	add : function(body){
		const newEventAttendee = new Event_Attendee({
      user_id: body.user,
      event_id: body.event,
      reply: null
  	})
  	return newEventAttendee.save()
	},
	getPair: function(id) {
		return knex.select('*').from('event_attendee').where('id', id)
	},
	getUsers: function(event_id) {
		return knex.select('*').from('event_attendee')
	  					 .where('event_id', event_id)
	  					 .innerJoin('user', 'event_attendee.user_id', 'user.id')


	},
	getEvents: async function(user_id) {
		//did this to avoid nested/async queries in graphql
	  let arr = await knex.select('*').from('event_attendee')
	  					 .where('user_id', user_id)
	  					 .innerJoin('event', 'event_attendee.event_id', 'event.id')
	  		arr.forEach(obj => obj['user_id'] = user_id)
	  		return arr

	},
	findAll : function() {
		return knex.select('*').from('event_attendee')
	},
	deleteById: function(id){
		return knex('event_attendee').where('id', id).del()
	},
	deleteByEventOrUser: function(field, user_or_event_id){
		return knex('event_attendee').where(field, user_or_event_id).del()
	},
	deleteByEventAndUser: function(user_id, event_id){
		return knex('event_attendee').where({'event_id': event_id, 'user_id' : user_id}).del()
	},
	confirmPresence: function(user_id, event_id){
		let rsvp
		return knex.select('*').from('event_attendee').where({'user_id': user_id, 'event_id': event_id})
		.update('reply', 1)
			.then(user => {
				return knex.select('*').from('user').where({'id': user_id})
					.then(item => item[0])
					.catch(error => error)
			})
			.catch(error => error)
	},
	denyPresence: function(user_id, event_id) {
		let rsvp
		return knex.select('*').from('event_attendee').where({'user_id': user_id, 'event_id': event_id})
		.update('reply', 0)
			.then(user => {
				return knex.select('*').from('user').where({'id': user_id})
					.then(item => item[0])
					.catch(error => error)
			})
			.catch(error => error)
	}
}



module.exports = eventAttendeeController
