const bookshelf = require('./dbConfig.js').bookshelf;
const User = require('./user.js');
const Item = require('./item.js');

var Event = bookshelf.Model.extend({
  tableName: 'event',
  items: function() {
    return this.hasMany(Item);
  },
  users: function(){
  	return this.belongsToMany(User)
  }
});

module.exports = bookshelf.model('Event', Event);