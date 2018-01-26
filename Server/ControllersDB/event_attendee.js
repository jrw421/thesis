const knex = require('../dbConfig.js').knex
const Event_Attendee = require('../ModelsDB/event_attendee.js')

eventAttendeeController = {
	add : (body, cb) =>{
		const newEventAttendee = new Event_Attendee({
      user_id: body.user,
      event_id: body.event
  	})
  	newEventAttendee.save()
  	.then(eventAttendee => {
  		cb(true, eventAttendee);
  	})
  	.catch(err => {
  		cb(false, err)
  	})
	}, 
	getEventAttendeeByEvent: (event_id, cb) => {
		knex.select('*').from('event_attendee')
		.where('event_id', event_id)
		.then(eventUsers => {
			cb(eventUsers);
		})
	},
	getEventAttendeeByAttendee: (user_id, cb) => {
		knex.select('*').from('event_attendee')
		.where('user_id', user_id)
		.then(userEvents => {
			cb(userEvents);
		})
	},
	findAll : (cb) =>{
		knex.select('*').from('event_attendee')
    .then((result) => {
      cb(result);
  	})
	}
}

module.exports = eventAttendeeController