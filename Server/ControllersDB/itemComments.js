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
      .catch(err => {
        console.log(err);
      });
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
      .catch(err => {
        console.log(error);
      });
  },
  getItemCommentById: function(id) {
    return knex('itemComments')
      .where('id', '=', id)
      .then(results => results)
      .catch(error => {
        console.log(error);
      });
  },
  getItemCommentsByItemId: function(id) {
    return knex('itemComments')
      .where('item_id', '=', id)
      .then(results => results)
      .catch(error => {
        console.log(error);
      });
  }
};

module.exports = itemCommentsController;
