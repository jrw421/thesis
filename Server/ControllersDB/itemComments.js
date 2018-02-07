const knex = require('../dbConfig.js').knex;
const ItemComment = require('../ModelsDB/itemComments.js');

itemCommentsController = {
  addItemComment: function(itemComment) {
    const { content, user_id, item_id, event_id } = itemComment;

    return new ItemComment({
      content: content,
      user_id: user_id,
      item_id: item_id,
      event_id: event_id
    })
      .save()
      .then(ItemComment => ItemComment)
      .catch(err => ['items comments controller', err]);
    
  },
  incrementLike: function(id) {
    knex('itemComments')
      .where('id', '=', `${id}`)
      .increment('likes', 1);
  },
  descrementLike: function(id) {
    knex('itemComments')
      .where('id', '=', `${id}`)
      .decrement('likes', 1);
  },
  getItemComment: function(event_id, item_id) {
    return knex('itemComments')
      .where('event_id', '=', event_id)
      .andWhere('item_id', '=', item_id)
      .orderBy('created_at')
      .then(results => results)
      .catch(err => ['getitemcomment', error]);
  },
  getItemCommentById: function(id) {
    return knex('itemComments')
      .where('id', '=', id)
      .then(results => results)
      .catch(error => ['getitemcommentforid', error])
  },
  getItemCommentsByItemId: function(id) {
    return knex('itemComments')
      .where('item_id', '=', id)
      .then(results => results)
      .catch(error => ['getitemCommentsbyItemid', error])
  }
};

module.exports = itemCommentsController;
