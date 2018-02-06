const bookshelf = require('../dbConfig.js').bookshelf;
const Event = require('./event.js');
const Item = require('./item.js');

const User = bookshelf.Model.extend({
  tableName: 'user',
  events() {
    return this.belongsToMany(Event);
  },
  items() {
    return this.hasMany(Item);
  },
});

module.exports = User;
