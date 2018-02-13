const bookshelf = require('../dbConfig.js').bookshelf;
const User = require('./user.js');
const Event = require('./event.js');

const Event_Attendee = bookshelf.Model.extend({
  tableName: 'event_attendee'
});

module.exports = Event_Attendee;
