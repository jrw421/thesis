const bookshelf = require('../dbConfig.js').bookshelf;
const User = require('./user.js');
const Event = require('./event.js');

const Event_Attendee = bookshelf.Model.extend({
  tableName: 'item',
  user() {
    return this.belongsToOne(User);
  },
  event() {
    return this.belongToOne(Event);
  },
});

module.exports = Event_Attendee;
