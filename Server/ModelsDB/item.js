const bookshelf = require('../dbConfig.js').bookshelf;
const User = require('./user.js');
const Event = require('./event.js');

const Item = bookshelf.Model.extend({
  tableName: 'item'
});

module.exports = Item;
