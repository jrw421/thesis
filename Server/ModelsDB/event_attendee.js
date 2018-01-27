const bookshelf = require('../dbConfig.js').bookshelf;
const User = require('./user.js');
const Event = require('./event.js');

const Event_Attendee = bookshelf.Model.extend({
  tableName: 'item'
  // event: function() {
  //   return this.hasOne(User)
  // }
});

module.exports = Event_Attendee