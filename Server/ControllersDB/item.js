const knex = require('../dbConfig.js').knex;
const Item = require('../ModelsDB/item.js');

itemController = {
  add: function(body) {
    const newItem = new Item({
      name: body.name,
      user_id: body.user_id,
      event_id: body.event_id
    });
    return newItem
      .save()
      .then(item => item.attributes)
      .catch(error => [19, error]);
  },
  addMultiple: function(body) {
    for (let i = 0; i < body.name.length; i++) {
      const newItem = new Item({
        name: body.name[i],
        event_id: body.event_id
      });

      if (i === body.name.length - 1) {
        return newItem.save().then(() => {
          return knex
            .select('*')
            .from('item')
            .where('event_id', body.event_id)
            .then(x => x)
            .catch(err => err)
        }).catch(error => [19, error]);
      } else {
        newItem.save()
        .catch(err => err);
      }
    }
  },
  getItem: async function(id) {
    let result = await knex
      .select('*')
      .from('item')
      .where('id', id)
      .then(x => x)
      .catch(err => err)
    return result[0];
  },
  claimItem: function(id, user_id) {
    return knex
      .select('*')
      .from('item')
      .where('id', id)
      .then(itemData => {
        if (user_id == itemData[0].user_id) {
          return knex
            .select('*')
            .from('item')
            .where('id', id)
            .update('user_id', null)
            .then(() => {
              return knex
                .select('*')
                .from('item')
                .where('id', id);
            })
            .catch(error => [18, error]);
        }

        if (JSON.parse(itemData[0].user_id) === null) {
          return knex
            .select('*')
            .from('item')
            .where('id', id)
            .update('user_id', user_id)
            .then(() => {
              return knex
                .select('*')
                .from('item')
                .where('id', id)
                .then(x => x)
                .catch(err => err)
            })
            .catch(error => [17, error]);
        }
      })
      .catch(error => console.log(16, error));
  },
  getItemsByUserId: function(user_id) {
    return knex
      .select('*')
      .from('item')
      .where('user_id', user_id)
      .then(x => x)
      .catch(err => err)
  },
  getItemsByEventId: function(event_id) {
    return knex
      .select('*')
      .from('item')
      .where('event_id', event_id)
      .then(x => x)
      .catch(err => err)
  },
  findAll: function() {
    return knex.select('*').from('item')
            .then(x => x)
            .catch(err => err)
  },
  deleteItem: function(id) {
    return knex('item')
      .where('id', id)
      .del()
      .then(x => x)
      .catch(err => err)
  },
  updateField: function(id, field, newValue) {
    return knex('item')
      .where('id', id)
      .update(field, newValue)
      .then(x => x)
      .catch(err => err)
  }
};

module.exports = itemController;
