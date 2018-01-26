const bookshelf = require('./dbConfig.js').bookshelf;
const Event = require('./events.js');

//require only what you end up using
var User = bookshelf.Model.extend({
  tableName: 'user',
  events: function() {
    return this.hasMany(Event)
  }
});
