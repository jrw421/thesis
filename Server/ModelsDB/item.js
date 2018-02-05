const bookshelf = require('../dbConfig.js').bookshelf;
const User = require('./user.js');
const Event = require('./event.js');

const Item = bookshelf.Model.extend({
  tableName: 'item',
  event: function() {
    return this.belongsTo(Event);
  },
  user: function() {
    return this.belongsTo(User);
  }
});

module.exports = Item;
