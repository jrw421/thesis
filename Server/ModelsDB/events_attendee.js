const bookshelf = require('./dbConfig.js').bookshelf;
const User = require('./user.js');
const Event = require('./event.js');

var Event_Attendee = bookshelf.Model.extend({
  tableName: 'item'
  // event: function() {
  //   return this.hasOne(User)
  // }
});

module.exports = bookshelf.model('Event_Attendee', Event_Attendee);