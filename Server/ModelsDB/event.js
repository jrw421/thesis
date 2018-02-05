const bookshelf = require('../dbConfig.js').bookshelf;
const User = require('./user.js');
const Item = require('./item.js');

const Event = bookshelf.Model.extend({
  tableName: 'event',
  items: function() {
    return this.hasMany(Item);
  },
  users: function() {
    return this.belongsToMany(User);
  }
});

module.exports = Event;
