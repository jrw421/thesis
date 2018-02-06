const knex = require('../dbConfig.js').knex;
const Vote = require('../ModelsDB/vote.js');

VoteController = {
  upVote: function(item_id, user_id) {
    // check if user has already voted on item
    return knex('votes')
      .where('item_id', '=', item_id)
      .andWhere('user_id', '=', user_id)
      .then(results => {
        if (results.length === 0) {
          return new Vote ({
            item_id: item_id,
            user_id: user_id,
            vote: 1
          })
            .save()
            .then(vote => vote)
            .catch(error => {console.log(error)})
        }
      })
      .catch(error => {console.log(error)})
  },
  downVote: function(item_id, user_id) {
    // check if user has already voted on item
    return knex('votes')
      .where('item_id', '=', item_id)
      .andWhere('user_id', '=', user_id)
      .then(results => {
        if (results.length === 0) {
          return new Vote ({
            item_id: item_id,
            user_id: user_id,
            vote: -1
          })
            .save()
            .then(vote => vote)
            .catch(error => {console.log(error)})
        }
      })
      .catch(error => {console.log(error)})
  },
  getUpVotesForItem: function(item_id) {
    return knex('votes')
            .where('item_id', '=', item_id)
            .andWhere('vote', '=', 1)
            .then(results => results)
            .catch(error => {console.log(error)})
  },
  getDownVotesForItem: function(item_id) {
    return knex('votes')
            .where('item_id', '=', item_id)
            .andWhere('vote', '=', -1)
            .then(results => results)
            .catch(error => {console.log(error)})
  },
  hasUserVotedForItem: function(user_id, item_id) {
    return knex('votes')
      .where('item_id', '=', item_id)
      .andWhere('user_id', '=', user_id)
      .then(results => {
        return results.length === 0 ? false : true
      })
      .catch(error => {console.log(error)})
  }
}

module.exports = VoteController
