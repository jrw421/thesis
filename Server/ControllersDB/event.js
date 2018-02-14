const knex = require('../dbConfig.js').knex;
const Event = require('../ModelsDB/event.js');
const conn = require('../dbConfig.js').conn


const createDateNum = function(){
  let current = new Date();
  let year = current.getFullYear()
  let month = ('' + (current.getMonth() + 1)).length === 1 ? '0' + (current.getMonth() + 1) : current.getMonth() + 1
  let day = ('' + current.getDate()).length === 1 ? '0' + current.getDate() : current.getDate()

  return Number('' + year + month + day)
}

eventController = {
  addEvent: async function(body) {
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
    try {
      result = await newEvent.save()
    } catch(error) {
      console.log([7, error])
      return error
    };
      return result.attributes;
  },
  getHostedEvents: function(user_id, cb) {
    let current = createDateNum()
    return conn.query(`select * from event where host_id = "${user_id}" and date > ${current - 1}`, function(err, results, fields){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })

    // return knex('event')
    // .where('date', '>', (current - 1))
    // .andWhere('host_id', user_id)
    // .then(x => {
    //   console.log('hosted', x)
    //   return x
    // })
    // .catch(err => err)
  },

  getCurrentEvents: function(user_id, cb) {
    console.log('what is the user_id ', user_id)
    let current = createDateNum()
    conn.query(`select * from event
      RIGHT JOIN event_attendee ON
      event_attendee.event_id = event.id AND event_attendee.user_id = "${user_id}"
      WHERE date > ${current - 1} `, function(err, results, fields){
      if (err){
        cb(err, null)
      } else {
        console.log('Here are the current Event results ', JSON.parse(JSON.stringify(results)))
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })

    // let current = createDateNum()
    // return knex
    // .select('*')
    // .from('event')
    // .where('date', '>', current)
    // .orWhere('date', '=', current)

    // .innerJoin('event_attendee', {'event_attendee.user_id' : user_id, 'event_attendee.event_id' : 'event.id'})
    // .then(x => {
    //   console.log('curr events', x)
    //   return x
    // })
    // .catch(err => err)
  },
  getPastEvents: function(user_id, cb){
    let current = createDateNum()
    return conn.query(`select * from event inner join event_attendee on (event_attendee.user_id = ${user_id} or host_id < ${user_id} and event_attendee.event_id = event.id) where date < ${current}`, function(err, results, fields){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
  getPastHostedEvents: async function(user_id, cb) {
    let current = createDateNum()
    return conn.query(`select * from event where host_id = "${user_id}" and date < ${current}`, function(err, results, fields){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
    // let current = createDateNum()
    // return        knex
    //                 .select('*')
    //                 .from('event')
    //                 .where('host_id', '=', user_id)
    //                 .andWhere('date', '<', current)
    //                 .then(results => results)
    //                 .catch(err => err)


    //                 `select * from event where host_id = "${user_id}" and date < ${current}`

  },
  getPastAttendingEvents: function(user_id, cb) {
    let current = createDateNum()
    return conn.query(`select * from event inner join event_attendee on (event_attendee.user_id = ${user_id} and event_attendee.event_id = event.id) where date < ${current}`, function(err, results, fields){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
    // let current = createDateNum()
    // return        knex
    //                 .select('*')
    //                 .from('event')
    //                 .where('date', '<', current)
    //                 .innerJoin('event_attendee', {'event_attendee.user_id' : user_id, 'event_attendee.event_id' : 'event.id'})
    //                 .then(x => x)
    //                 .catch(err => err)
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
  deleteEvent: function(id) {
    return knex('event')
      .where('id', id)
      .del()
      .then((x) => x)
      .catch(err => err);
  },
  editEventFields: function(id, fields, cb) {
    return conn.query(`select * from event where id = ${id}`, function(err, results, fields){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  }
};


module.exports = eventController;
