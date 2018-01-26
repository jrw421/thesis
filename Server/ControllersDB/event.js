const knex = require('../dbConfig.js').knex
const Event = require('../ModelsDB/event.js')

eventController = {
	add : (body, cb) =>{
		const newEvent = new Event({
			host_id: body.host
  		description: body.description,
      date: body.date,
      location: body.location, 
      image: body.image
  	})
  	newEvent.save()
  	.then(event => {
  		cb(true, event);
  	})
  	.catch(err => {
  		cb(false, err)
  	})
	}, 
	getEvent: (id, cb) => {
		knex.select('*').from('event')
		.where('id', id)
		.then(event=> {
			cb(event);
		})
	},
	findAll : (cb) =>{
		knex.select('*').from('event')
    .then((result) => {
      cb(result);
  	})
	}
}

module.exports = eventController