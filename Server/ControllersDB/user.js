const knex = require('../dbConfig.js').knex;
const User = require('../ModelsDB/user.js');

userController = {
  findOrCreateUser: function(body) {
    return knex
      .select('*')
      .from('user')
      .where('google_id', body.google_id)
      .then(profileCheck => {
        if (profileCheck.length > 0) {
          const updates = {
            email: body.email,
            accessToken: body.accessToken,
          };
          return this.editFields(profileCheck[0].id, updates)
            .then(() => this.getUser(null, body.google_id))
            .catch(error => console.log(3, error));
        } else {
          const newUser = new User({
            name: body.name,
            img: body.img,
            google_id: body.google_id,
            email: body.email,
            accessToken: body.accessToken, 
            member_status: 1
          });
          return newUser
            .save()
            .then(user => user.attributes)
            .catch(error => console.log(1, error));
        }
      })
      .catch(error => console.log(2, error));
  },
  createUserOnSignup: function(body) {
    const newUser = new User({
      name: body.name,
      img: body.img,
      google_id: body.google_id,
      email: body.email,
      accessToken: body.accessToken
    });

    return newUser
      .save()
      .then(user => user.attributes)
      .catch(error => console.log(error));
  },
  getUserById: function(id) {
    return knex
      .select('*')
      .from('user')
      .where('id', id)
      .then(result => {
        console.log('result', result);
        return result[0];
      })
      .catch(error => {
        console.log('error: ', error);
      });
  },
  getUserByGoogleId: function(google_id) {
    return knex
      .select('*')
      .from('user')
      .where('google_id', google_id)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        console.log('error: ', error);
      });
  },
  getUserByHash: function(hash) {
    return knex
      .select('*')
      .from('user')
      .where('hash', hash)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        console.log('error: ', error);
      });
  },
  getUser: async function(id, google_id, hash) {
    console.log(6, 'hi', id, 'googleid', google_id)
    let result
    if (google_id !== null && google_id !== undefined) {
      try{
      result = await knex
        .select('*')
        .from('user')
        .where('google_id', google_id)
      } catch(error) {
        console.log(4, error);
      }
      return result[0];
    } else if (hash !== null && hash !== undefined) {
      try{
      result = await knex
        .select('*')
        .from('user')
        .where('hash', hash)
      } catch(error){
        console.log(5, error);
      }
      return result[0];
    } else {
      try{
        console.log(6, 'id', id, 'typeof id', typeof id)
      result = await knex
        .select('*')
        .from('user')
        .where('id', id)
      } catch(error){
        console.log(6, 'await catach', error);
      }
      console.log(6,  'result1', result)
      if (result){
        console.log(6, 'result2', result[0])
      return result[0];
    } else {
      return null
    }
    }
  },
  getToken: function() {
    return knex
      .select('accessToken')
      .from('user')
      .where('id', id);
  },
  findAll: function() {
    return knex.select('*').from('user');
  },
  deleteUser: function(id) {
    return knex('user')
      .where('id', id)
      .del();
  },
  editField: function(id, field, newValue) {
    return knex('user')
      .where('id', id)
      .update(field, newValue)
      .then(result => {
        this.getUserById(id)
          .then(result => {
            return result;
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  },
  editFields: function(id, obj) {
    return knex('user')
      .where('id', id)
      .update(obj);
  }
};

module.exports = userController;
