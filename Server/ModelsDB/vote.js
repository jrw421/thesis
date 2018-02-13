const bookshelf = require('../dbConfig.js').bookshelf;

const Vote = bookshelf.Model.extend({
  tableName: 'votes'
});

module.exports = Vote;