const knex = require('../dbConfig.js').knex;
const User = require('../ModelsDB/user.js');

const userController = {
  findOrCreateUser: (body) => {
    return knex
      .select('*')
      .from('user')
      .where('google_id', body.google_id)
      .then((profileCheck) => {
        if (profileCheck.length > 0) {
          const updates = {
            email: body.email,
            accessToken: body.accessToken,
          };
          return this.editFields(profileCheck[0].id, updates)
            .then(() => this.getUser(null, body.google_id))
            .catch(error => [3, error]);
        }

        const newUser = new User({
          name: body.name,
          img: body.img,
          google_id: body.google_id,
          email: body.email,
          accessToken: body.accessToken,
          member_status: 1,
        });
        return newUser
          .save()
          .then(user => user.attributes)
          .catch(error => [1, error]);
      })
      .catch(error => [2, error]);
  },
  createUserOnSignup: (body) => {
    const newUser = new User({
      name: body.name,
      img: body.img,
      google_id: body.google_id,
      email: body.email,
      accessToken: body.accessToken,
      refreshToken: body.refreshToken
    });

    return newUser
      .save()
      .then(user => user.attributes)
      .catch(error => ['100', error]);
  },
  getUserById: (id) => {
    return knex
      .select('*')
      .from('user')
      .where('id', id)
      .then((result) => {
        return result[0];
      })
      .catch(error => ['error: getuserbyid', error]);
  },
  getUserByGoogleId: (google_id) => {
    return knex
      .select('*')
      .from('user')
      .where('google_id', google_id)
      .then((result) => {
        return result[0];
      })
      .catch((error) => {
        return ['error get userbygooglid: ', error];
      });
  },
  getUserByHash: (hash) => {
    return knex
      .select('*')
      .from('user')
      .where('hash', hash)
      .then((result) => {
        return result[0];
      })
      .catch(error => ['error getuserbyhash: ', error]);
  },
  getUser: async (id, google_id, hash) => {
    let result;
    if (google_id !== null && google_id !== undefined) {
      try{
      result = await knex
        .select('*')
        .from('user')
        .where('google_id', google_id)
        .then(x => x)
      } catch(error) {
        return[4, error];
      }
      return result[0];
    } else if (hash !== null && hash !== undefined) {
      try {
        result = await knex
          .select('*')
          .from('user')
          .where('hash', hash)
          .then(x => x)
      } catch (error) {
        return [5, error];
      }
      return result[0];
    } else {
      try{
      result = await knex
        .select('*')
        .from('user')
        .where('id', id)
        .then(x => x)

      } catch(error){
        return[6, 'await catach', error];
      }
        if (result){
        return result[0];
      } else {
        return null
      }
    }
  },
  getToken: (id) => {
    return knex
      .select('accessToken')
      .from('user')
      .where('id', id)
      .then(x => x)
      .catch(err => err)
  },
  findAll: () => {
    return knex.select('*').from('user')
       .then(x => x)
      .catch(err => err)
  },
  deleteUser: (id) => {
    return knex('user')
      .where('id', id)
      .del()
      .then(x => x)
      .catch(err => err)
  },
  editField: (id, field, newValue) => {
    return knex('user')
      .where('id', id)
      .update(field, newValue)
      .then((result) => {
        this.getUserById(id)
          .then((result) => {
            console.log('edit field result', result)
            return result;
          })
          .catch((error) => {
            return['edit field error', error];
          });
      })
      .catch(error => {
        return ['editfield error2', error];
      });
  },
  editFields: (id, obj) => {
    return knex('user')
      .where('id', id)
      .update(obj)
      .then((result) => {
        this.getUserById(id)
          .then((result) => {
            return result;
          })
          .catch((error) => {
            return['edit field error', error];
          });
      })
      .catch(error => {
        return ['editfield error2', error];
      });
  }
};

module.exports = userController;

