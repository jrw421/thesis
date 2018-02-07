const knex = require('../dbConfig.js').knex;
const Event = require('../ModelsDB/event.js');

eventController = {
  addEvent: async body => {
    const newEvent = new Event({
      name: body.name,
      host_id: body.host_id,
      description: body.description,
      date: body.date,
      location: body.location,
      img: body.img
    });
    let result
    try{
    result = await newEvent.save()
    }catch(error){
    return [7, error]
    };
    return result.attributes;
  },
  getHostedEvents: function(user_id) {
    console.log('bindings', user_id)
    return knex('event').where('host_id', user_id);
    //commented out for MVP functionality
    // let current = new Date()
    // let dateNum = Number('' + current.getFullYear() + current.getMonth() + current.getDate())
    // return knex('event').where('host_id', user_id).andWhere('date', '>=', dateNum)
  },
  getPastEvents: function(user_id) {
    let current = new Date();
    let dateNum = Number(
      '' + current.getFullYear() + current.getMonth() + current.getDate()
    );
    return knex('event').where('date', '<', dateNum);
  },
  getCurrentEvents: function(user_id) {
    console.log('get current events id', user_id)
    let current = new Date();
    let dateNum = Number(
      '' + current.getFullYear() + current.getMonth() + current.getDate()
    );
    return knex('event').where('date', '>=', dateNum);
  },
  getEvent: async function(id) {
    let result
    try{
    result = await knex
      .select('*')
      .from('event')
      .where('id', id)
    } catch(error){
      return [8, id, error]
    }
    if(result){
     return result[0];
    } else {
     return
    }
  },
  findAll: function() {
    return knex.select('*').from('event');
  },
  deleteEvent: function(id) {
    return knex('event')
      .where('id', id)
      .del();
  },
  editEventFields: function(id, fields) {
    const length = Object.keys(fields).length;
    let count = 0;
    for (var key in fields) {
      if (key !== 'id') {
        count++;
        knex('event')
          .where('id', id)
          .update(key, fields[key]);
        if (count === length - 1) {
          return knex('event').where('id', id);
        }
      }
    }
  }
};

module.exports = eventController;


eventController.getHostedEvents(22).then(x=> console.log('working hosted', x))
eventController.getPastEvents(22).then(x=> console.log('working past', x))
eventController.getCurrentEvents(22).then(x=> console.log('working current', x))