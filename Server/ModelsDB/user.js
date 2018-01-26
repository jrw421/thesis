const bookshelf = require('./dbConfig.js').bookshelf;
const Event = require('./event.js');
const Item = require('./item.js');

var User = bookshelf.Model.extend({
  tableName: 'user',
  events: function() {
    return this.belongsToMany(Event)
  }, 
  items: function() {
    return this.hasMany(Item)
  }
});

module.exports = bookshelf.model('User', User);