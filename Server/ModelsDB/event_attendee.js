const bookshelf = require('../dbConfig.js').bookshelf;
const User = require('./user.js');
const Event = require('./event.js');

const Event_Attendee = bookshelf.Model.extend({
  tableName: 'item',
  user: function() {
    return this.belongsToOne(User)
  }, 
  event: function() {
    return this.belongToOne(Event)
  }
});

module.exports = Event_Attendee