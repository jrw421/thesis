const bookshelf = require('../dbConfig.js').bookshelf;
const Event = require('./event.js');
const Item = require('./item.js');

const User = bookshelf.Model.extend({
  tableName: 'user',
  events: function() {
    return this.belongsToMany(Event);
  },
  items: function() {
    return this.hasMany(Item);
  }
});

module.exports = User;
