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

	getHostedEvents : function(user_id){
		return knex.select('*').from('event').where('host_id', user_id)
	},
	filterEvents: async function(user_id){
		let current = new Date()
		let dateNum = Number('' + current.getFullYear() + current.getMonth() + current.getDate())
		return Promise.all([knex('event').where('date', '>=', dateNum), knex('event').where('date', '<', dateNum)])
					 .then(vals => {
					 	let obj = {}
					 	obj['attending'] = vals[0]
					 	obj['past'] = vals[1]
					 	return obj
					 })
	},
	getEvent: async function(id){
		let result = await knex.select('*').from('event').where('id', id)
		return result[0]
	},
	findAll : function(){
		return knex.select('*').from('event')
	}, 
	deleteEvent : function(id){
		return knex('event').where('id', id).del()
	}, 
	editEventFields : function(id, fields){
		const length = Object.keys(fields).length
		let count = 0
		for (var key in fields) {
			if(key !== 'id') {
			count++
			knex('event').where('id', id).update(key, fields[key])
			if (count === length - 1) {
				return knex('event').where('id', id)
			}
		}
		}
	}
	
}

eventController.filterEvents()


module.exports = eventController
