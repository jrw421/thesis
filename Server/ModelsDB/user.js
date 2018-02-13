const bookshelf = require('../dbConfig.js').bookshelf;
const Event = require('./event.js');
const Item = require('./item.js');

const User = bookshelf.Model.extend({
  tableName: 'user'
});

module.exports = User;
