const bookshelf = require('./dbConfig.js').bookshelf;
const Event = require('./event.js');

var User = bookshelf.Model.extend({
  tableName: 'user',
  events: function() {
    return this.hasMany(Event)
  }
});
