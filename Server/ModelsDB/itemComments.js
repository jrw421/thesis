const bookshelf = require('../dbConfig.js').bookshelf;

const ItemComment = bookshelf.Model.extend({
  tableName: 'itemComments'
});

module.exports = ItemComment;
