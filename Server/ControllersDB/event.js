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
  addEvent: function(body, cb) {
    const {name, host_id, description, time, date, location, img, dateTimeStart } = body
    conn.query(`insert into event (name, host_id, description, time, date, location, img, dateTimeStart) values ("${name}", ${host_id}, "${description}", "${time}", ${date}, "${location}", "${img}", "${dateTimeStart}")`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        conn.query(`select * from event where id = ${results.insertId}`, function(err, results){
          if (err){
            cb(err, null)
          } else {
            cb(null, JSON.parse(JSON.stringify(results))[0])
          }
        })
      }
    })
  },
  getHostedEvents: function(user_id, cb) {
    let current = createDateNum()
    conn.query(`select * from event where host_id = ${user_id} and date > ${current - 1}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },

  getCurrentEvents: function(user_id, cb) {
    console.log('what is the user_id ', user_id)
    let current = createDateNum()
    conn.query(`select * from event_attendee
      inner join event ON
      event_attendee.event_id = event.id
      AND event_attendee.user_id = "${user_id}"
      WHERE date > ${current - 1} `, function(err, results, fields){
      if (err){
        cb(err, null)
      } else {
        console.log('Here are the current Event results ', JSON.parse(JSON.stringify(results)))
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
  getPastEvents: function(user_id, cb){
    let current = createDateNum()
    conn.query(`select * from event_attendee inner join event on event_attendee.user_id = ${user_id} or event.host_id = ${user_id} and event_attendee.event_id = event.id where date < ${current}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
  getEvent: function(id, cb) {
     conn.query(`select * from event where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results))[0])
      }
    })
  },
  lastEvent: function(user_id, cb){
    conn.query(`select lastEvent from user where id = ${user_id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        console.log('is last event working')
        conn.query(`select * from event where id = ${results[0].lastEvent}`, function(error, res){
          if (error){
            cb(error, null)
          } else {
            cb(null, JSON.parse(JSON.stringify(res))[0])
          }
        })
      }
    })
  },
  deleteEvent: function(id, cb) {
    conn.query(`delete from event where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
  editEventFields: function(id, fields, cb) {
    let q = ""
    for (let key in fields){
      if (typeof fields[key] !== "string"){
        q += ", " + key + ' = ' + fields[key]
      } else {
        q += ", " + key + ' = ' + `"${fields[key]}"`
      }
    }

    conn.query(`update event set ${q.substring(2)} where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        console.log('results afterupdate event fieldss', results)
        cb(null, JSON.parse(JSON.stringify(results))[0])
      }
    })
  }
};

module.exports = eventController;
