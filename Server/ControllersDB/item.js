const knex = require('../dbConfig.js').knex;
const Item = require('../ModelsDB/item.js');
const conn = require('../dbConfig.js').conn

itemController = {
  add: function(body, cb) {
    const {name, user_id, event_id } = body
    let string = ``
    if (user_id === undefined){
      string += `("${name}", NULL, ${event_id})`
    } else {
      string += `("${name}", ${user_id}, ${event_id})`
    }
    conn.query(`insert into item (name, user_id, event_id) values ${string}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
  addMultiple: function(body, cb) {
    let string = `("${body.name[0]}", ${body.event_id})`
    for (let i = 1; i < body.name.length; i++) {
        string += `, ("${body.name[i]}", ${body.event_id})`
    }
  
    conn.query(`insert into item (name, event_id) values ${string}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        conn.query(`select * from item where event_id = ${body.event_id}`, function(error, res){
          if (error){
            cb(error, null)
          } else {
            console.log('results items', res)
            cb(null, JSON.parse(JSON.stringify(res)))
          }
        })
      }
    })
  
  },
  getItem: function(id, cb) {
    conn.query(`select * from item where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results))[0])
      }
    })
  },
  claimItem: function(id, user_id, cb) {
     conn.query(`select * from item where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        console.log('23334455566', results)
         if (user_id == JSON.parse(JSON.stringify(results))[0].user_id){
           conn.query(`update item set user_id = NULL where id = ${id}`, function(err1, results1){
             if (err1){
               cb(err1, null)
             } else {
               conn.query(`select * from item where id = ${id}`, function(err2, results2){
                if (err2){
                  cb(err2, null)
                } else {
                  cb(null, JSON.parse(JSON.stringify(results)))
                }
               })
             }
           })
         }
         if (null == JSON.parse(JSON.stringify(results))[0].user_id){
           console.log('2222222', results)
            conn.query(`update item set user_id = ${user_id} where id = ${id}`, function(error, res){
             if (error){
               cb(error, null)
             } else {
               conn.query(`select * from item where id = ${id}`, function(error2, res2){
                if (error2){
                  cb(error2, null)
                } else {
                  cb(null, JSON.parse(JSON.stringify(res2)))
                }
               })
             }
           })
         }
      }
    })
  },
  getItemsByUserId: function(user_id, cb) {
    conn.query(`select * from item where user_id = ${user_id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
  getItemsByEventId: function(event_id, cb) {
    conn.query(`select * from item where event_id = ${event_id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
  deleteItem: function(id, event_id, cb) {
    conn.query(`delete from item where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
         conn.query(`select * from item where event_id = ${event_id}`, function(error, res){
           if (error){
             cb(error, null)
           } else {
             cb(null, JSON.parse(JSON.stringify(res)))
           }
         })
      }
    })
  },
  updateField: function(id, field, newValue, cb) {
    let q = ""
    if (typeof newValue !== "string"){
        q +=  field + ' = ' + newValue
    } else {
        q +=  field + ' = ' + `"${newValue}"`
    } 

    conn.query(`update item set (${q}) where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results)))
      }
    })
  },
};

module.exports = itemController;
