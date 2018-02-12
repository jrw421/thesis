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
    console.log('add event body', body)
    const newEvent = new Event({
      name: body.name,
      host_id: body.host_id,
      description: body.description,
      time: body.time,
      date: body.date,
      location: body.location,
      img: body.img, 
      endTime: body.endTime
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
    .andWhere('date', '>', (current - 1))
    .then(x => {
      console.log('hosted', x)
      return x
    })
    .catch(err => err)
    //commented out for MVP functionality
    // let current = new Date()
    // let dateNum = Number('' + current.getFullYear() + current.getMonth() + current.getDate())
    // return knex('event').where('host_id', user_id).
  },
  getPastHostedEvents: async function(user_id) {
    let current = createDateNum()
    return        knex
                    .select('*')
                    .from('event')
                    .where('host_id', '=', user_id)
                    .andWhere('date', '<', current)
                    .then(results => results)
                    .catch(err => err)
    
  },
  getPastAttendingEvents: function(user_id) {
    let current = createDateNum()
    return        knex
                    .select('*')
                    .from('event')
                    .where('date', '<', current)
                    .innerJoin('event_attendee', {'event_attendee.user_id' : user_id, 'event_attendee.event_id' : 'event.id'})
                    .then(x => x)
                    .catch(err => err)
  },
  getCurrentEvents: function(user_id) {
    let current = createDateNum()
    return knex
    .select('*')
    .from('event')
    .where('date', '>', current)
    .orWhere('date', '=', current)
    .innerJoin('event_attendee', {'event_attendee.user_id' : user_id, 'event_attendee.event_id' : 'event.id'})
    .then(x => {
      console.log('curr events', x)
      return x
    })
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
      return error
    }
    if(result){
     return result[0];
    } else {
     return
    }
  },
  lastEvent: async function(user_id){
    let result
    try {
      result = await knex
                      .select('lastEvent')
                      .from('user')
                      .where('id', user_id)
                      .then(x => {
                        console.log('try x', x)
                        return x
                      })
    } catch(error){
      return error
    }
    console.log('aafter try x', result)
    return  knex
            .select('*')
            .from('event')
            .where('id', result[0].lastEvent)
            .then(x => {
              return x[0]
            })
            .catch(err => err)
  },
  findAll: function() {
    return knex.select('*').from('event');
  },
  deleteEvent: function(id) {
    return knex('event')
      .where('id', id)
      .del()
      .then((x) => x)
      .catch(err => err);
  },
  editEventFields: function(id, fields) {
    return knex('event')
      .where('id', id)
      .update(fields)
      .then(() => {
        return knex('event').where('id', id).then(x => x).catch(x => x)
      })
      .catch((err) => err)
  }
};


module.exports = eventController;
