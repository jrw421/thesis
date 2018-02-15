const knex = require('../dbConfig.js').knex;
const User = require('../ModelsDB/user.js');
const conn = require('../dbConfig.js').conn


const userController = {
  findOrCreateUser: function(body, cb){
    conn.query(`select * from user where google_id = "${google_id}"`, function(err, results, fields){
      if (err){
        cb(err, null)
      } else {
        if (results.length > 0){
          conn.query(`update user set email = "${body.email}", accessToken = '${body.accessToken}', refreshToken = "${body.refreshToken}" where google_id = "${body.google_id}"`, function(err1, results1, fields){
            if (err1){
              cb(err1, null)
            } else {
               conn.query(`select * from user where google_id = "${google_id}")`, function(error, res, fields){
                if (error){
                  cb(error, null)
                } else {
                  cb(null, JSON.parse(JSON.stringify(res[0])))
                }
              })
            }
          })
        } else {
          conn.query(`insert into user (name, img, google_id, email, accessToken, refreshToken) values ("${name}", "${img}", "${google_id}", "${email}", "${accessToken}", "${refreshToken}")`, function(err, results){
            if (err){
              cb(err, null)
            } else {
              cb(null, JSON.parse(JSON.stringify(results)).attributes)
            }
          })
        }
      }
    })
  },
  createUserOnSignup: function(body, cb){
    const {name, img, google_id, email, accessToken, refreshToken} = body
    conn.query(`insert into user (name, img, google_id, email, accessToken, refreshToken) values ("${name}", "${img}", "${google_id}", "${email}", "${accessToken}", "${refreshToken}")`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        conn.query(`select * from user where id = ${JSON.parse(JSON.stringify(results)).insertId}`, function(error, res){
          if(error){
            cb(error, null)
          } else {
            cb(null, JSON.parse(JSON.stringify(res))[0])
          }
        })
      }
    })
  },
  getUserById: function(id, cb, guest){
    conn.query(`select * from user where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        if (guest) {
          let user = JSON.parse(JSON.stringify(results))[0]
          user.guest_event_id = guest
          cb(null, user)
        } else {
          cb(null, JSON.parse(JSON.stringify(results))[0])
        }
      }
    })
  },
  getUserByGoogleId: function(google_id, cb){
    conn.query(`select * from user where google_id = "${google_id}"`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results))[0])
      }
    })
  },
  getUserByHash: function(hash, cb) {
    conn.query(`select * from user where hash = "${hash}"`, function(err, results){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(results))[0])
      }
    })
  },
  editField: function (id, field, newValue, cb) {
    let q = ""
    if (typeof newValue !== "string"){
        q +=  field + ' = ' + newValue
    } else {
        q +=  field + ' = ' + `'${newValue}'`
    } 
    
    conn.query(`update user set ${q} where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
         conn.query(`select * from user where id = ${id}`, function(error, res){
          if (error){
            cb(error, null)
          } else {
            cb(null, JSON.parse(JSON.stringify(res))[0])
          }
        })
      }
    })
  },
  editFields: function(id, obj, cb) {
    let q = ""
    for (let key in obj){
      if (typeof obj[key] !== "string"){
        q += ", " + key + ' = ' + obj[key]
      } else {
        q += ", " + key + ' = ' + `"${obj[key]}"`
      } 
    }

    conn.query(`update user set ${q.substring(2)} where id = ${id}`, function(err, results){
      if (err){
        cb(err, null)
      } else {
         conn.query(`select * from user where id = ${id}`, function(error, res){
          if (error){
            cb(error, null)
          } else {
            cb(null, JSON.parse(JSON.stringify(res))[0])
          }
        })
      }
    })
  },
  getMemberByEmail: function(email, cb){
    conn.query(`select * from user where email = "${email}" and member_status != ${0}`, function(err, res){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(res))[0])
      }
    })
  }, 
  getHashForUser: function(user_id, event_id, cb){
    conn.query(`select hash from user where member_status = ${user_id} and guest_event_id = ${event_id}`, function(err, res){
      if (err){
        cb(err, null)
      } else {
        cb(null, JSON.parse(JSON.stringify(res))[0].hash)
      }
    })
  },
};

module.exports = userController;

