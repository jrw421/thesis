const knex = require('../dbConfig.js').knex;
const Event = require('../ModelsDB/event.js');

const createDateNum = function(){
  let current = new Date();
  let year = current.getFullYear()
  let month = ('' + (current.getMonth() + 1)).length === 1 ? '0' + (current.getMonth() + 1) : current.getMonth() + 1
  let day = ('' + current.getDate()).length === 1 ? '0' + current.getDate() : current.getDate()

  return Number('' + year + month + day)
}

eventController = {
  addEvent: async body => {
    const newEvent = new Event({
      name: body.name,
      host_id: body.host_id,
      description: body.description,
      time: body.time,
      date: body.date,
      location: body.location,
      img: body.img
    });
    let result
    try{
      result = await newEvent.save()
    } catch(error) {
      console.log([7, error])
      return error
    };
      return result.attributes;
  },
  getHostedEvents: function(user_id) {
    let current = createDateNum()
    return knex
    .select('*')
    .from('event')
    .where('host_id', '=', user_id)
    .andWhere('date', '>', current)
    .orWhere('date', '=', current)
    .then(x => x)
    .catch(err => err)
    //commented out for MVP functionality
    // let current = new Date()
    // let dateNum = Number('' + current.getFullYear() + current.getMonth() + current.getDate())
    // return knex('event').where('host_id', user_id).
  },
  getPastEvents: async function(user_id) {
    let current = createDateNum()
    var x = await knex
                    .select('*')
                    .from('event')
                    .where('date', '<', current)
                    .innerJoin('event_attendee', 'event_attendee.user_id', user_id)
                    .then(res => res)
                    .catch(err => err)

    return        knex
                    .select('*')
                    .from('event')
                    .where('host_id', '=', user_id)
                    .andWhere('date', '<', current)
                    .then(results => {
                      console.log('past events', results.concat(x))
                      return results.concat(x)
                    })
                    .catch(err => {
                      console.log('past error', err)
                      return err
                    })
    
  },
  getCurrentEvents: function(user_id) {
    console.log('get curr events, id:', user_id)
    let current = createDateNum()
    return knex
    .select('*')
    .from('event')
    .where('date', '>', current)
    .orWhere('date', '=', current)
    .innerJoin('event_attendee', 'event_attendee.user_id', user_id)
    .then(x => x)
    .catch(err => err)
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
