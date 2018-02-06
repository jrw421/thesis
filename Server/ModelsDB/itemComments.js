const bookshelf = require('../dbConfig.js').bookshelf;

const ItemComments = bookshelf.Model.extend({
  tableName: 'itemComments'
});
