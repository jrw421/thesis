const bookshelf = require('./dbConfig.js').bookshelf;
const User = require('./user.js');
const Event = require('./event.js');

var Event_attendee = bookshelf.Model.extend({
  tableName: 'item',
  event: function() {
    return this.hasOne(User)
  }
});
