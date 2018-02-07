const bookshelf = require('../dbConfig.js').bookshelf;
const User = require('./user.js');
const Item = require('./item.js');

const Event = bookshelf.Model.extend({
  tableName: 'event',
  items() {
    return this.hasMany(Item);
  },
  users() {
    return this.belongsToMany(User);
  },
});

module.exports = Event;
