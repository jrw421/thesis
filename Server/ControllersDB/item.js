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
      .catch(error => console.log(19, error));
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
            .where('event_id', body.event_id);
        }).catch(error => console.log(19, error));
      } else {
        newItem.save();
      }
    }
  },
  getItem: async function(id) {
    let result = await knex
      .select('*')
      .from('item')
      .where('id', id);
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
            .catch(error => console.log(18, error));
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
                .where('id', id);
            })
            .catch(error => console.log(17, error));
        }
      })
      .catch(error => console.log(16, error));
  },
  getItemsByUserId: function(user_id) {
    return knex
      .select('*')
      .from('item')
      .where('user_id', user_id);
  },
  getItemsByEventId: function(event_id) {
    return knex
      .select('*')
      .from('item')
      .where('event_id', event_id);
  },
  findAll: function() {
    return knex.select('*').from('item');
  },
  deleteItem: function(id) {
    return knex('item')
      .where('id', id)
      .del();
  },
  updateField: function(id, field, newValue) {
    return knex('item')
      .where('id', id)
      .update(field, newValue);
  }
};

module.exports = itemController;
