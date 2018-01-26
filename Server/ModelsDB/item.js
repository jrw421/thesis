const bookshelf = require('./dbConfig.js').bookshelf;
const User = require('./user.js');

var Item = bookshelf.Model.extend({
  tableName: 'item',
  events: function() {
    return this.hasMany(User)
  }
});
