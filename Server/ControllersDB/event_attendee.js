const knex = require('../dbConfig.js').knex;
const Event_Attendee = require('../ModelsDB/event_attendee.js');
const conn = require('../dbConfig.js').conn

eventAttendeeController = {
  add: function(body, cb) {
    conn.query(`insert into event_attendee (user_id, event_id, reply) values (${body.user}, ${body.event}, ${2})`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        console.log('add attributes', results)
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
  getPair: function(id, cb) {
    conn.query(`select * from event_attendee where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results))[0])
      }
    })
  },
  getUsers: function(event_id, cb) {
    conn.query(`select * from event_attendee inner join user on (event_attendee.user_id = user.id) where event_id = ${event_id}`, function(err, results){
      if (err){
        console.log('get users err', err)
        cb(err, null)
      } else {
        console.log('get users results', results)
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
  confirmPresence: function(user_id, event_id, cb) {
    conn.query(`update event_attendee set reply = 1 where user_id = ${user_id} and event_id = ${event_id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
         conn.query(`select * from user where id = ${user_id}`, function(error, res){
          console.log('confirm pres', error, res)
          if (err){
            cb(error, null)
          } else {
            cb(null, JSON.parse(JSON.stringify(res))[0])
          }
        })
      }
    })
  },
  denyPresence: function(user_id, event_id, cb) {
    conn.query(`update event_attendee set reply = 0 where user_id = ${user_id} and event_id = ${event_id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
         conn.query(`select * from user where id = ${user_id}`, function(error, res){
          console.log('deny pres', error, res)
          if (err){
            cb(error, null)
          } else {
            cb(null, JSON.parse(JSON.stringify(res))[0])
          }
        })
      }
    })
  }, 
  checkReply: function(user_id, event_id, cb){
    conn.query(`select reply from event_attendee where (user_id = ${user_id} and event_id = ${event_id})`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        console.log('reply', JSON.parse(JSON.stringify(results))[0].reply)
        cb(null, JSON.parse(JSON.stringify(results))[0].reply)
      }
    })
 },
};

module.exports = eventAttendeeController;
