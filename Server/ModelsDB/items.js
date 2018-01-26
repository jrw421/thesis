const bookshelf = require('./dbConfig.js').bookshelf;
const User = require('./users.js');

//require only what you end up using
var Item = bookshelf.Model.extend({
  tableName: 'item',
  events: function() {
    return this.hasMany(User)
  }
});
